export default function ARViewer() {
  return (
    <div className="min-h-screen pt-32 px-6 max-w-6xl mx-auto">

      {/* ================= TITLE ================= */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        AI-Powered AR Structure Viewer
      </h1>

      <p className="text-gray-700 max-w-3xl text-lg leading-relaxed mb-14">
        An immersive augmented reality experience that allows users to view
        iconic monuments like the Taj Mahal directly in their real-world
        surroundings using their device camera.
      </p>

      {/* ================= HERO IMAGE ================= */}
      <div className="mb-20">
        <img
          src="/posters/ar-1.webp"
          alt="AR Structure Viewer Preview"
          className="w-96 rounded-3xl shadow-2xl object-cover"
        />
      </div>

      {/* ================= PROBLEM ================= */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">The Problem</h2>
        <p className="text-gray-700 leading-relaxed">
          Architectural wonders are often experienced through flat images or
          videos, which fail to communicate scale, spatial presence, and
          immersion. Users lack a way to truly understand how these structures
          exist in physical space.
        </p>
      </section>

      {/* ================= IMAGE BREAK ================= */}
      <div className="mb-20">
        <img
          src="/posters/ar-2.webp"
          alt="AR Monument in Real Surroundings"
          className="w-96 rounded-3xl shadow-xl object-cover"
        />
      </div>

      {/* ================= SOLUTION ================= */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
        <p className="text-gray-700 leading-relaxed">
          The AR Structure Viewer places realistic 3D monuments into the user’s
          real environment using augmented reality. Structures are anchored to
          detected surfaces and rendered at accurate scale, allowing users to
          walk around and explore naturally.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <li>• Real-world AR placement using device camera</li>
          <li>• Accurate monument scaling & spatial alignment</li>
          <li>• 360° exploration through physical movement</li>
          <li>• Optimized 3D rendering for performance</li>
          <li>• Minimal UI for immersive viewing</li>
        </ul>
      </section>

      {/* ================= IMAGE BREAK ================= */}
      <div className="mb-20">
        <img
          src="/posters/ar-4.webp"
          alt="AR Viewer Technical View"
          className="w-96 rounded-3xl shadow-xl object-cover"
        />
      </div>

      {/* ================= TECH STACK ================= */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Tools & Technologies</h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>AR Rendering:</strong> Three.js + WebXR</li>
          <li><strong>3D Models:</strong> Optimized GLTF / GLB assets</li>
          <li><strong>Device APIs:</strong> Camera, motion & orientation sensors</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
        </ul>
      </section>

      {/* ================= TECH FLOW ================= */}
      <section className="mb-20 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>

        <ol className="list-decimal pl-6 text-gray-700 space-y-3">
          <li>User grants camera access to start AR session</li>
          <li>System detects real-world surfaces</li>
          <li>3D monument is anchored and scaled correctly</li>
          <li>Real-time rendering adapts to movement and perspective</li>
          <li>User explores the structure by moving physically</li>
        </ol>
      </section>

      {/* ================= CLOSING ================= */}
      <section className="max-w-3xl mb-28">
        <h2 className="text-2xl font-semibold mb-4">Why This Project Matters</h2>
        <p className="text-gray-700 leading-relaxed">
          This project demonstrates how augmented reality can be used beyond
          novelty — enabling meaningful, educational, and immersive experiences.
          It reflects strong understanding of spatial computing, performance,
          and user-centered system design.
        </p>
      </section>

    </div>
  );
}