'use client'

import { useEffect, useRef } from 'react'

const WebGLBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null
    if (!gl) {
      console.warn('WebGL not supported, falling back to CSS background')
      return
    }

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      
      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader source with flowing plasma gradient
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      
      // Improved noise function for smoother gradients
      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }
      
      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        
        vec2 u = f * f * (3.0 - 2.0 * f);
        
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }
      
      // Enhanced FBM for flowing plasma effect
      float fbm(vec2 st, float time) {
        float value = 0.0;
        float amplitude = 0.5;
        
        // Add time-based offset for flow
        st += time * vec2(0.1, 0.05);
        
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      // Domain warping for organic distortion
      vec2 domainWarp(vec2 st, float time) {
        float warpStrength = 0.3;
        return st + warpStrength * vec2(
          fbm(st + vec2(0.0, time * 0.1), time),
          fbm(st + vec2(time * 0.12, 0.0), time)
        );
      }
      
      void main() {
        vec2 st = v_uv;
        vec2 normalizedCoord = gl_FragCoord.xy / u_resolution;
        
        // Center coordinates
        vec2 pos = normalizedCoord - 0.5;
        pos.x *= u_resolution.x / u_resolution.y;
        
        // Mouse interaction - create elastic pull effect
        vec2 mousePos = u_mouse - 0.5;
        mousePos.x *= u_resolution.x / u_resolution.y;
        
        // Calculate distance from center to mouse
        float mouseDistance = length(mousePos);
        vec2 mouseDirection = normalize(mousePos);
        
        // Create elastic offset - blob follows mouse but springs back
        float pullStrength = 0.15; // How much the blob moves toward mouse
        float maxPull = 0.3; // Maximum displacement
        vec2 elasticOffset = mouseDirection * min(mouseDistance * pullStrength, maxPull);
        
        // Apply smooth falloff so effect is strongest at center
        float centerInfluence = 1.0 - smoothstep(0.0, 0.8, length(pos));
        elasticOffset *= centerInfluence;
        
        // Offset the position for mouse interaction
        vec2 interactivePos = pos - elasticOffset;
        
        // Apply domain warping for organic flow using interactive position
        vec2 warpedPos = domainWarp(interactivePos * 2.0, u_time * 0.2);
        
        // Multiple flowing noise layers for plasma effect
        float plasma1 = fbm(warpedPos * 1.5 + u_time * 0.08, u_time);
        float plasma2 = fbm(warpedPos * 2.3 + u_time * 0.12, u_time + 100.0);
        float plasma3 = fbm(warpedPos * 3.1 + u_time * 0.15, u_time + 200.0);
        
        // Combine plasma layers
        float combinedPlasma = plasma1 * 0.5 + plasma2 * 0.3 + plasma3 * 0.2;
        
        // Add radial falloff for subtle background gradient (using interactive position)
        float centerDistance = length(interactivePos);
        float radialFalloff = 1.0 - smoothstep(0.0, 1.8, centerDistance);
        
        // Apply breathing effect
        float breathe = 0.9 + 0.2 * sin(u_time * 0.3);
        radialFalloff *= breathe;
        
        // Remove corner shrinking for full screen coverage
        // Keep the organic distortion but make it more subtle (using interactive position)
        float ballDistortion = sin(atan(interactivePos.y, interactivePos.x) * 3.0 + u_time * 0.15) * 0.1;
        ballDistortion += sin(atan(interactivePos.y, interactivePos.x) * 5.0 + u_time * 0.1) * 0.05;
        float distortedRadius = centerDistance + ballDistortion * 0.3;
        float organicGlow = 1.0 - smoothstep(0.3, 1.5, distortedRadius);
        radialFalloff *= (0.3 + organicGlow * 0.7);
        
        // Create flowing heat zones with much subtler intensity
        float heatZone1 = sin(combinedPlasma * 6.28 + u_time * 0.3) * 0.3 + 0.4;
        float heatZone2 = sin(combinedPlasma * 8.0 + u_time * 0.4 + 2.0) * 0.2 + 0.3;
        float heatZone3 = sin(combinedPlasma * 4.0 + u_time * 0.25 + 4.0) * 0.15 + 0.25;
        
        // Much more subtle color mapping to match reference image
        vec3 color1 = vec3(0.15, 0.05, 0.04) * heatZone1; // Dark red
        vec3 color2 = vec3(0.25, 0.08, 0.06) * heatZone2; // Slightly brighter red
        vec3 color3 = vec3(0.35, 0.12, 0.08) * heatZone3; // Medium red
        
        // Blend colors based on plasma values
        vec3 plasmaColor = mix(color1, color2, smoothstep(0.2, 0.6, plasma1));
        plasmaColor = mix(plasmaColor, color3, smoothstep(0.3, 0.7, plasma2));
        
        // Apply radial falloff but keep it very subtle for full screen coverage
        plasmaColor *= radialFalloff * 0.8 + 0.3; // Always some base intensity
        
        // Add very subtle flowing highlights only near center
        float edgeGlow = smoothstep(0.4, 0.7, combinedPlasma) * radialFalloff * 0.15;
        plasmaColor += edgeGlow * vec3(0.4, 0.15, 0.1);
        
        // Darker base background to match reference
        vec3 baseColor = vec3(0.05, 0.02, 0.015);
        
        // Combine everything with more prominent base color
        vec3 finalColor = baseColor + plasmaColor;
        
        // Reduce noise intensity
        float grain = noise(normalizedCoord * 150.0 + u_time * 0.05) * 0.01;
        finalColor += grain;
        
        // Reduce vignette effect for more uniform coverage
        float vignette = 1.0 - length(normalizedCoord - 0.5) * 0.2;
        finalColor *= vignette;
        
        // Add ambient temperature variation
        float ambient = 0.8 + 0.2 * sin(u_time * 0.1 + combinedPlasma * 2.0);
        finalColor *= ambient;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Create shader function
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      
      return shader
    }

    // Create program function
    const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
      const program = gl.createProgram()
      if (!program) return null
      
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking error:', gl.getProgramInfoLog(program))
        gl.deleteProgram(program)
        return null
      }
      
      return program
    }

    // Setup WebGL
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource)
    
    if (!vertexShader || !fragmentShader) return

    const program = createProgram(gl, vertexShader, fragmentShader)
    if (!program) return

    // Create buffer for full-screen quad
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]), gl.STATIC_DRAW)

    // Get attribute and uniform locations
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position')
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time')
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution')
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse')

    // Resize canvas
    const resizeCanvas = () => {
      const displayWidth = window.innerWidth
      const displayHeight = window.innerHeight
      
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth
        canvas.height = displayHeight
        gl.viewport(0, 0, displayWidth, displayHeight)
      }
    }

    // Animation loop
    const animate = (time: number) => {
      resizeCanvas()
      
      // Smooth mouse interpolation for elastic effect
      targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.1
      targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.1
      
      gl.clearColor(0, 0, 0, 1)
      gl.clear(gl.COLOR_BUFFER_BIT)
      
      gl.useProgram(program)
      
      // Set uniforms
      gl.uniform1f(timeUniformLocation, time * 0.001)
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height)
      gl.uniform2f(mouseUniformLocation, targetRef.current.x, targetRef.current.y)
      
      // Set up attributes
      gl.enableVertexAttribArray(positionAttributeLocation)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0)
      
      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    animate(0)

    // Mouse event handlers for elastic blob interaction
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (event.clientX - rect.left) / rect.width
      mouseRef.current.y = 1.0 - (event.clientY - rect.top) / rect.height // Flip Y
    }

    const handleMouseLeave = () => {
      // Return to center when mouse leaves
      mouseRef.current.x = 0.5
      mouseRef.current.y = 0.5
    }

    // Handle resize
    const handleResize = () => resizeCanvas()
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

export default WebGLBackground
