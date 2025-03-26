import React, {useState} from 'react'

function Face() {
    const [image1, setImage1] = useState(null)
    const [image2, setImage2] = useState(null)
    const [result, setResult] = useState('')
    const [loading, setLoading] = useState(false)

    const fetchFaceMatch = async () => {
        setLoading(true)
        const formData = new FormData()
        formData.append('img1', image1)
        formData.append('img2', image2)

        try {
            const response = await fetch('http://localhost:8000/face/check', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                const data = await response.json()
                setResult(data.status)
            } else {
                console.error('Failed to fetch face match result')
            }
        } catch (error) {
            console.error('Error fetching face match result:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleImageChange1 = (e) => {
        setImage1(e.target.files[0])
    }

    const handleImageChange2 = (e) => {
        setImage2(e.target.files[0])
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (image1 && image2) {
            fetchFaceMatch()
        } else {
            console.error('Please upload both images')
        }
    }

    return (
        <div className="bg-[var(--bg2)] poppins dark:bg-gray-100 p-3 md:p-7 min-h-screen flex items-center justify-center">
            <div className="container bg-[var(--bg1)] dark:bg-white mx-auto p-3 md:p-10 rounded-2xl shadow-black/70 border-[1px] dark:shadow-black/20 dark:shadow-md border-[var(--opac)] dark:border-gray-300 shadow-2xl">
                <h1 className="text-2xl md:text-4xl pricedown font-bold text-[var(--lgold)] dark:text-[var(--dlgold)] mb-2 text-center">
                    Face Match
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-center">
                        <div className="mb-4 p-4">
                            <label className="block text-[var(--ltext)] dark:text-[var(--dltext)] mb-2">
                                Upload Image 1
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange1}
                                className="block w-full text-[var(--ltext)] dark:text-[var(--dltext)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-gray-200 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
                            />
                            {image1 && (
                                <img
                                    src={URL.createObjectURL(image1)}
                                    alt="Image 1"
                                    className="mt-4 object-cover h-[300px] rounded-md"
                                />
                            )}
                        </div>
                        <div className="mb-4 p-4">
                            <label className="block text-[var(--ltext)] dark:text-[var(--dltext)] mb-2">
                                Upload Image 2
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange2}
                                className="block w-full text-[var(--ltext)] dark:text-[var(--dltext)] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-200 file:text-gray-700 dark:file:bg-gray-700 dark:file:text-gray-200 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
                            />
                            {image2 && (
                                <img
                                    src={URL.createObjectURL(image2)}
                                    alt="Image 2"
                                    className="mt-4 object-cover h-[300px] rounded-md"
                                />
                            )}
                        </div>
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="bg-[var(--lblue)] md:mb-0 mb-5 text-[var(--bg1)] shadow-black/50 shadow-xl dark:shadow-none font-medium px-6 py-2 rounded-lg hover:bg-[var(--lgold)] transition ease-in-out duration-300"
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'Submit'}
                        </button>
                    </div>
                </form>
                {result && (
                    <div className="mt-4 text-center text-lg font-bold text-[var(--ltext)] dark:text-[var(--dltext)]">
                        {result}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Face
