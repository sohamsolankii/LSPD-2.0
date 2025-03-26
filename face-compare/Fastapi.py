import os
import shutil
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import face_recognition

app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def face_Recog(img1_path: str, img2_path: str) -> bool:
    known_image = face_recognition.load_image_file(img1_path)
    known_face_encoding = face_recognition.face_encodings(known_image)[0]

    unknown_image = face_recognition.load_image_file(img2_path)
    face_locations = face_recognition.face_locations(unknown_image)
    face_encodings = face_recognition.face_encodings(unknown_image, face_locations)

    if not face_encodings:
        return False

    for face_encoding in face_encodings:
        matches = face_recognition.compare_faces([known_face_encoding], face_encoding)
        if True in matches:
            return True

    return False

@app.post("/face/check")
async def check_face_match(img1: UploadFile = File(...), img2: UploadFile = File(...)) -> dict[str, str]:
    try:
        file_location = f"temp_{img1.filename}"
        with open(file_location, "wb") as buffer:
            shutil.copyfileobj(img1.file, buffer)

        file_location1 = f"temp_{img2.filename}"
        with open(file_location1, "wb") as buffer:
            shutil.copyfileobj(img2.file, buffer)
        
        if not os.path.exists(file_location):
            return JSONResponse(content={"error": f"File {file_location} was not created"}, status_code=500)
        
        if not os.path.exists(file_location1):
            return JSONResponse(content={"error": f"File {file_location1} was not created"}, status_code=500)

        match = face_Recog(file_location, file_location1)

        # Clean up temporary files
        if os.path.exists(file_location):
            os.remove(file_location)
        if os.path.exists(file_location1):
            os.remove(file_location1)

        # Return the response based on face match result
        if match:
            return {"status": "Face matches"}
        else:
            return {"status": "Face does not match"}
    
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
