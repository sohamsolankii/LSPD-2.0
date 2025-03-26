import React, {useRef, useEffect} from 'react'
import * as THREE from 'three'
import {Canvas, useFrame} from '@react-three/fiber'
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader'
import {OrbitControls} from '@react-three/drei'

const Model = ({url}) => {
    const ref = useRef()

    useEffect(() => {
        const loader = new GLTFLoader()
        loader.load(url, (gltf) => {
            ref.current.add(gltf.scene)
        })
    }, [url])

    return <group ref={ref} />
}

const Try3D = ({path}) => {
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <Model url={path} />
            <OrbitControls />
        </Canvas>
    )
}

export default Try3D
