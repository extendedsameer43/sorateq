'use client'

import { useEffect, useRef, useState } from 'react'

const SecondaryHeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') as WebGLRenderingContext | null
    if (!gl) {
      console.warn('WebGL not supported')
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

    // Fragment shader with more alive, expanding gradient
    const fragmentShaderSource = `
      precision mediump float;
      varying vec2 v_uv;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      
      // Enhanced noise functions for more organic movement
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
      
      // Fractal Brownian Motion for complex patterns
      float fbm(vec2 st, float time) {
        float value = 0.0;
        float amplitude = 0.5;
        float frequency = 1.0;
        
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st * frequency + time * 0.1);
          st *= 2.0;
          amplitude *= 0.5;
          frequency *= 2.0;
        }
        
        return value;
      }
      
      // Enhanced domain warping for more organic expansion
      vec2 domainWarp(vec2 st, float time) {
        float warpStrength = 0.8;
        return st + warpStrength * vec2(
          fbm(st + vec2(0.0, time * 0.15), time),
          fbm(st + vec2(time * 0.18, 0.0), time)
        );
      }
      
      void main() {
        vec2 st = v_uv;
        vec2 normalizedCoord = gl_FragCoord.xy / u_resolution;
        
        // Center coordinates
        vec2 pos = normalizedCoord - 0.5;
        pos.x *= u_resolution.x / u_resolution.y;
        
        // Enhanced mouse interaction with more fluid response
        vec2 mousePos = u_mouse - 0.5;
        mousePos.x *= u_resolution.x / u_resolution.y;
        
        float mouseDistance = length(mousePos);
        vec2 mouseDirection = normalize(mousePos);
        
        // More responsive elastic effect
        float pullStrength = 0.25;
        float maxPull = 0.4;
        vec2 elasticOffset = mouseDirection * min(mouseDistance * pullStrength, maxPull);
        
        float centerInfluence = 1.0 - smoothstep(0.0, 1.2, length(pos));
        elasticOffset *= centerInfluence;
        
        vec2 interactivePos = pos - elasticOffset;
        
        // Enhanced domain warping with multiple layers
        vec2 warpedPos1 = domainWarp(interactivePos * 1.8, u_time * 0.2);
        vec2 warpedPos2 = domainWarp(interactivePos * 2.5, u_time * 0.15 + 50.0);
        
        // Multiple plasma layers with different speeds for alive feeling
        float plasma1 = fbm(warpedPos1 * 1.2 + u_time * 0.1, u_time);
        float plasma2 = fbm(warpedPos1 * 2.0 + u_time * 0.08, u_time + 100.0);
        float plasma3 = fbm(warpedPos2 * 1.5 + u_time * 0.12, u_time + 200.0);
        float plasma4 = fbm(warpedPos2 * 3.2 + u_time * 0.06, u_time + 300.0);
        
        // Combine plasmas with breathing expansion
        float combinedPlasma = plasma1 * 0.4 + plasma2 * 0.3 + plasma3 * 0.2 + plasma4 * 0.1;
        
        // Dynamic expanding gradient with breathing effect
        float centerDistance = length(interactivePos);
        float breathingExpansion = 1.4 + 0.6 * sin(u_time * 0.25) + 0.3 * sin(u_time * 0.4);
        float radialFalloff = 1.0 - smoothstep(0.0, breathingExpansion, centerDistance);
        
        // Enhanced breathing with multiple frequencies
        float breathe = 0.85 + 0.25 * sin(u_time * 0.3) + 0.15 * sin(u_time * 0.7);
        radialFalloff *= breathe;
        
        // Organic shifting with angular distortion
        float angularShift = sin(atan(interactivePos.y, interactivePos.x) * 4.0 + u_time * 0.2) * 0.15;
        angularShift += sin(atan(interactivePos.y, interactivePos.x) * 6.0 + u_time * 0.15) * 0.1;
        angularShift += sin(atan(interactivePos.y, interactivePos.x) * 8.0 + u_time * 0.1) * 0.05;
        
        float distortedRadius = centerDistance + angularShift;
        float organicGlow = 1.0 - smoothstep(0.2, 1.8, distortedRadius);
        radialFalloff *= (0.4 + organicGlow * 0.6);
        
        // Enhanced flowing heat zones with non-uniform spread
        float heatZone1 = sin(combinedPlasma * 5.0 + u_time * 0.4) * 0.4 + 0.5;
        float heatZone2 = sin(combinedPlasma * 7.0 + u_time * 0.3 + 2.0) * 0.3 + 0.4;
        float heatZone3 = sin(combinedPlasma * 3.0 + u_time * 0.35 + 4.0) * 0.25 + 0.35;
        float heatZone4 = sin(combinedPlasma * 9.0 + u_time * 0.2 + 6.0) * 0.2 + 0.3;
        
        // More varied color palette for alive feeling
        vec3 color1 = vec3(0.2, 0.06, 0.05) * heatZone1; // Deep red
        vec3 color2 = vec3(0.3, 0.1, 0.07) * heatZone2; // Medium red
        vec3 color3 = vec3(0.4, 0.15, 0.1) * heatZone3; // Bright red
        vec3 color4 = vec3(0.25, 0.08, 0.12) * heatZone4; // Purple-red
        
        // Enhanced color blending with more complexity
        vec3 plasmaColor = mix(color1, color2, smoothstep(0.2, 0.7, plasma1));
        plasmaColor = mix(plasmaColor, color3, smoothstep(0.3, 0.8, plasma2));
        plasmaColor = mix(plasmaColor, color4, smoothstep(0.1, 0.6, plasma3));
        
        // Apply radial falloff with non-uniform distribution
        plasmaColor *= radialFalloff * 0.9 + 0.2;
        
        // Enhanced flowing highlights with shifting patterns
        float edgeGlow1 = smoothstep(0.3, 0.8, combinedPlasma) * radialFalloff * 0.2;
        float edgeGlow2 = smoothstep(0.4, 0.7, plasma1 + plasma3) * radialFalloff * 0.15;
        
        plasmaColor += edgeGlow1 * vec3(0.5, 0.2, 0.15);
        plasmaColor += edgeGlow2 * vec3(0.4, 0.25, 0.2);
        
        // Enhanced base background with subtle variation
        vec3 baseColor = vec3(0.06, 0.025, 0.02) + vec3(0.02, 0.01, 0.008) * sin(u_time * 0.1);
        
        // Combine with enhanced mixing
        vec3 finalColor = baseColor + plasmaColor;
        
        // Enhanced noise texture with movement
        float grain = noise(normalizedCoord * 120.0 + u_time * 0.08) * 0.015;
        finalColor += grain;
        
        // Subtle shifting vignette
        float vignette = 1.0 - length(normalizedCoord - 0.5) * (0.3 + 0.1 * sin(u_time * 0.2));
        finalColor *= vignette;
        
        // Enhanced ambient variation for alive feeling
        float ambient = 0.75 + 0.3 * sin(u_time * 0.12 + combinedPlasma * 1.5);
        finalColor *= ambient;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Shader creation functions
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

    // Create shaders and program
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
      targetRef.current.x += (mouseRef.current.x - targetRef.current.x) * 0.08
      targetRef.current.y += (mouseRef.current.y - targetRef.current.y) * 0.08
      
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

    // Mouse event handlers
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (event.clientX - rect.left) / rect.width
      mouseRef.current.y = 1.0 - (event.clientY - rect.top) / rect.height
    }

    const handleMouseLeave = () => {
      mouseRef.current.x = 0.5
      mouseRef.current.y = 0.5
    }

    // Event listeners
    const handleResize = () => resizeCanvas()
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  // Text cycling animation
  useEffect(() => {
    // Start showing content after a brief delay
    const showContentTimer = setTimeout(() => {
      setShowContent(true)
    }, 500)

    // Cycle through text lines
    const textCycleTimer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % 3) // 3 text lines
    }, 3000) // Change every 3 seconds

    return () => {
      clearTimeout(showContentTimer)
      clearInterval(textCycleTimer)
    }
  }, [])

  const textLines = [
    "Agentic AI isn't just another tool.",
    "It's the next generation of",
    "teammates"
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Enhanced WebGL Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      
      {/* Content Overlay */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-center text-white px-8 max-w-6xl">
          {/* Stacked Text Lines - Only one visible at a time */}
          <div className="relative h-32 md:h-40 mb-12 overflow-hidden">
            {textLines.map((line, index) => (
              <div 
                key={index}
                className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ease-in-out ${
                  currentTextIndex === index ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-line">
                  {index === 2 ? (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </h1>
              </div>
            ))}
          </div>

          <p className={`text-xl md:text-2xl text-gray-300 mb-12 transition-opacity duration-1000 delay-1000 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}>
            Where technology meets boundless possibility
          </p>
          <div className={`flex flex-col md:flex-row gap-6 justify-center transition-opacity duration-1000 delay-1500 ${
            showContent ? 'opacity-100' : 'opacity-0'
          }`}>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-full text-white font-semibold hover:from-orange-600 hover:to-red-700 transition-all duration-300 transform hover:scale-105">
              Explore Solutions
            </button>
            <button className="px-8 py-4 border-2 border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SecondaryHeroSection
