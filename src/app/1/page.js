'use client';

import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import { TextureLoader, Color, MathUtils, DoubleSide } from 'three';
import FadeInWrapper from '@/components/FadeInWrapper';
import { useState, useEffect, useRef } from 'react';
import PngAnimator from '@/components/PngAnimator';
import FounderParticles from '@/components/FounderParticles';

const fov = 75;

function FloatingPlane({ textureUrl, alphaUrl = null, position = [0, 0, -5], size = [5, 3], emissive = true, transparent = true }) {
  const textures = useLoader(TextureLoader, alphaUrl ? [textureUrl, alphaUrl] : [textureUrl]);
  const map = textures[0];
  const alphaMap = textures[1] ?? null;

  return (
    <mesh position={position} renderOrder={emissive ? 1 : 2}>
      <planeGeometry args={size} />
      <meshStandardMaterial
        map={map}
        emissiveMap={emissive ? map : null}
        emissive={emissive ? new Color(0xffffff) : new Color(0x000000)}
        alphaMap={alphaMap}
        transparent={transparent}
        depthWrite={!transparent}
        side={DoubleSide}
      />
    </mesh>
  );
}

function ScrollCameraRig() {
  const { camera } = useThree();
  const targetY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      targetY.current = -scrollTop * 0.003;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_, delta) => {
    camera.position.y = MathUtils.damp(camera.position.y, targetY.current, 5, delta);
  });

  return null;
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[0, 0, 5]} intensity={2} />
      <FloatingPlane textureUrl="/grid-backdrop-classic-1920x1280.png" position={[0, 5, -10]} size={[30, 16]} emissive transparent={false} />
      <FloatingPlane textureUrl="/plants-frame.png" alphaUrl="/plants-frame-alpha.png" position={[0, 3, -4]} size={[16, 11]} />
      <FloatingPlane textureUrl="/copy-hero-1.png" alphaUrl="/copy-hero-1.png" position={[0, 3.3, -6]} size={[12, 12]} />
      <ScrollCameraRig />
    </>
  );
}

export default function PageOne() {
  const [mounted, setMounted] = useState(false);
  const [hoveringCubes, setHoveringCubes] = useState(false);
  const [hoveringEmmy, setHoveringEmmy] = useState(false);
  const [hoveringBtc, setHoveringBtc] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <FadeInWrapper>
      <section className="canvas-section">
        <div className="hero-wrapper">
          <div className="canvas-container">
            {mounted && (
              <Canvas camera={{ fov, position: [0, 0, 2], near: 0.1, far: 100 }} style={{ width: '100vw', height: '120vh', display: 'block' }}>
                <Scene />
              </Canvas>
            )}
          </div>
        </div>
      </section>

      <section className="static-png-wrapper">
        <img src="/black-blur-box.png" alt="Overlay PNG" className="static-png" />
      </section>

      <section className="two-column-section">
        <div
          className="column"
          onMouseEnter={() => setHoveringBtc(true)}
          onMouseLeave={() => setHoveringBtc(false)}
        >
<div className="column-bg">
  <div className={`animated-bg ${hoveringBtc ? 'visible' : ''}`}>
    <PngAnimator
      basePath="/Blocks-BTC-Stats"
      prefix="Blocks-BTC-Stats"
      frameCount={30}
      interval={80}
      digits={4}
      playing={hoveringBtc}
    />
  </div>
</div>
          <PngAnimator
            basePath="/BTC-Floating"
            prefix="BTC-Floating"
            frameCount={60}
            interval={80}
            digits={4}
            playing={hoveringBtc}
          />
          <img src="/1-Bitcoin-App.png" alt="#1 Bitcoin App" style={{ width: '100%', marginTop: '-20px' }} />
        </div>

        <div
          className="column"
          onMouseEnter={() => setHoveringEmmy(true)}
          onMouseLeave={() => setHoveringEmmy(false)}
        >
<div className="column-bg">
  <div className={`animated-bg ${hoveringEmmy ? 'visible' : ''}`}>
    <PngAnimator
      basePath="/Blocks-NFT-Stats"
      prefix="Blocks-NFT-Stats"
      frameCount={30}
      interval={80}
      digits={4}
      playing={hoveringEmmy}
    />
  </div>
</div>
          <PngAnimator
            basePath="/Emmy-Floating"
            prefix="Emmy-Floating"
            frameCount={15}
            interval={40}
            digits={4}
            playing={hoveringEmmy}
          />
          <img src="/Largest-NFT-Marketplace-Copy.png" alt="Largest NFT Marketplace" style={{ width: '100%', marginTop: '-20px' }} />
        </div>
      </section>

      <section className="body-text-box" style={{ marginBottom: '100px' }}>
	<p>
	  We’ve built the largest cross-chain NFT marketplace and the #1 Bitcoin app, and with now our acquisition of <a href="https://slingshot.app" target="_blank" rel="noopener noreferrer" className="green-link">Slingshot</a>, users 	can trade over 5 million tokens across all major chains.
	</p>

        <p>
          Our growing product suite includes a cross-chain wallet, advanced trading tools and the ability to mint, collect and trade, well, anything. 
        </p>
      </section>

      <div
        className="cubes-underlay"
        onMouseEnter={() => setHoveringCubes(true)}
        onMouseLeave={() => setHoveringCubes(false)}
      >
        <PngAnimator
          basePath="/Blocks-Frames"
          frameCount={60}
          interval={90}
          playing={hoveringCubes}
        />
        <img
          src="/Our-Vision.png"
          alt="Our Vision"
          className="cubes-overlay"
        />
      </div>

      <section className="body-text-box" style={{ marginTop: '-40px' }}>
	<p>
	  <span className="bold-line">Build the best place to trade and create onchain.</span> Fast, intuitive and ready for wherever the space goes next.
	</p>
        <p>
          We're applying everything we learned from NFTs to token trading, L2 infrastructure, AI and tools that push the limits of what’s possible across chains. 
        </p>
      </section>

      <div style={{ position: 'relative', width: '100%', height: '500px', marginTop: '-50px' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
          <FounderParticles />
        </div>
        <img
          src="/Our-Founders.png"
          alt="Our Founders"
          className="founders-overlay"
        />
      </div>

      <section className="founder-cards">
        <div className="founder-card">
          <div className="founder-card-inner">
            <img src="/Sydney.png" alt="Sydney Zhang" />
            <h4>Sydney Zhang</h4>
            <p>
  <a href="https://twitter.com/sidazhang" target="_blank" rel="noopener noreferrer" className="twitter-link">
    @sidazhang
  </a>
</p>

          </div>
        </div>
        <div className="founder-card">
          <div className="founder-card-inner">
            <img src="/Jack.png" alt="Jack Lu" />
            <h4>Jack Lu</h4>
<p>
            <a href="https://twitter.com/0xLeoinRio" target="_blank" rel="noopener noreferrer" className="twitter-link">
  @0xLeoinRio
</a>
</p>
          </div>
        </div>
        <div className="founder-card">
          <div className="founder-card-inner">
            <img src="/Z.png" alt="Zhuoxun Yin" />
            <h4>Zhuoxun Yin</h4>
<p>
            <a href="https://twitter.com/ZhuoxunYun" target="_blank" rel="noopener noreferrer" className="twitter-link">
  @ZhuoxunYun
</a>
</p>

          </div>
        </div>
        <div className="founder-card">
          <div className="founder-card-inner">
            <img src="/Rex.png" alt="Zhuojie Zhou" />
            <h4>Zhuojie Zhou</h4>
<p>
            <a href="https://twitter.com/rexzh0u" target="_blank" rel="noopener noreferrer" className="twitter-link">
  @rexzh0u
</a>
</p>
          </div>
        </div>
      </section>

<section className="body-text-box" style={{ marginTop: '320px' }}>
  <p>
    Magic Eden was founded in 2021 by Jack Lu (CEO), Sidney Zhang (CTO), Zhuoxun Yin (COO) and Zhuojie Zhou (Chief Engineer) with one goal: create a fast, intuitive platform where trading, collecting and interacting with digital assets could feel natural.
  </p>
  <p>
We started with NFTs. Now, we're building the on-chain future as one of the most recognizable names in crypto.
  </p>
</section>

      <section className="links-title-wrapper" style={{ marginTop: '100px' }}>
        <img
          src="/Links.png"
          alt="Links Section Title"
          className="links-title"
        />
      </section>

      <div className="links-button-row">
        <a href="#" className="gradient-button">Contact</a>
        <a href="#" className="gradient-button">Press</a>
        <a href="#" className="gradient-button">Launchpad</a>
        <a href="#" className="gradient-button">Brandkit</a>
      </div>

      <section className="footer-image-wrapper">
        <img
          src="/Computer.png"
          alt="Computer Footer"
          className="footer-image"
        />
      </section>
    </FadeInWrapper>
  );
}

