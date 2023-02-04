import Head from 'next/head';

import * as THREE from 'three';
import * as THREEx from 'node_modules/@ar-js-org/ar.js/three.js/build/ar-threex-location-only';
import { useEffect, useRef } from 'react';

export default function Home() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        const canvas = ref.current;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(60, 1.33, 0.1, 10000);
        const renderer = new THREE.WebGLRenderer({ canvas });

        const arjs = new THREEx.LocationBased(scene, camera);
        const cam = new THREEx.WebcamRenderer(renderer);

        const geom = new THREE.BoxGeometry(20, 20, 20);
        const mtl = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const box = new THREE.Mesh(geom, mtl);
        arjs.add(box, -0.72, 51.051);

        const render = () => {
            if (
                canvas.width != canvas.clientWidth ||
                canvas.height != canvas.clientHeight
            ) {
                renderer.setSize(
                    canvas.clientWidth,
                    canvas.clientHeight,
                    false
                );
                const aspect = canvas.clientWidth / canvas.clientHeight;
                camera.aspect = aspect;
                camera.updateProjectionMatrix();
            }
            cam.update();
            renderer.render(scene, camera);
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);

        arjs.fakeGps(-0.72, 51.05);
    }, [ref]);

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <canvas ref={ref} />
        </>
    );
}
