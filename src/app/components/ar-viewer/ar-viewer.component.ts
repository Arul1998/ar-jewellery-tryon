import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-ar-viewer',
  templateUrl: './ar-viewer.component.html',
  styleUrls: ['./ar-viewer.component.scss'],
})
export class ArViewerComponent implements AfterViewInit {
  @ViewChild('rendererCanvas', { static: true })
  rendererCanvas!: ElementRef<HTMLCanvasElement>;

  scene!: THREE.Scene;
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  ringMesh!: THREE.Mesh;

  ngAfterViewInit(): void {
    this.initThreeJs();
  }

  initThreeJs() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.rendererCanvas.nativeElement,
      alpha: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Add lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(light);

    // Create a test ring (torus shape)
    const geometry = new THREE.TorusGeometry(0.2, 0.05, 16, 100);
    const material = new THREE.MeshStandardMaterial({ color: 0xffd700 });
    this.ringMesh = new THREE.Mesh(geometry, material);
    this.ringMesh.position.set(0, 0, -1);

    this.scene.add(this.ringMesh);
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ringMesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
