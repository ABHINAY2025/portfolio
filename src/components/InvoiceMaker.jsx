export default function InvoiceMaker() {
  return (
    <div className="min-h-screen pt-32 px-6 max-w-6xl mx-auto">

      {/* ================= TITLE ================= */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6">
        Smart Invoice Generator
      </h1>

      <p className="text-gray-700 max-w-3xl text-lg leading-relaxed mb-14">
        A full-stack invoice generation system designed for businesses to create
        clean, professional invoices with automatic calculations, exports, and
        persistent data handling.
      </p>

      {/* ================= HERO IMAGE ================= */}
      <div className="mb-20">
        <img
          src="/posters/invoice-1.webp"
          alt="Invoice Generator Preview"
          className="w-96 rounded-3xl shadow-2xl object-cover"
        />
      </div>

      {/* ================= PROBLEM ================= */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">The Problem</h2>
        <p className="text-gray-700 leading-relaxed">
          Small businesses often rely on spreadsheets or manual tools for
          billing, leading to calculation errors, inconsistent formatting, and
          wasted time. Most solutions lack flexibility and professional output.
        </p>
      </section>

      {/* ================= IMAGE BREAK ================= */}
      <div className="mb-20">
        <img
          src="/posters/invoice-2.png"
          alt="Invoice Layout and PDF Export"
          className="w-96 rounded-3xl shadow-xl object-cover"
        />
      </div>

      {/* ================= SOLUTION ================= */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
        <p className="text-gray-700 leading-relaxed">
          The Smart Invoice Generator provides an intuitive interface where
          users can enter client details, line items, and tax values while the
          system handles calculations, formatting, and exports automatically.
        </p>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Key Features</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <li>• Automatic subtotal, tax & total calculations</li>
          <li>• Clean, professional invoice layouts</li>
          <li>• PDF generation & download support</li>
          <li>• Persistent invoice data storage</li>
          <li>• Responsive design for all devices</li>
        </ul>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="mb-16 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">Tools & Technologies</h2>

        <ul className="list-disc pl-6 text-gray-700 space-y-2">
          <li><strong>Frontend:</strong> React.js</li>
          <li><strong>Styling:</strong> Tailwind CSS</li>
          <li><strong>PDF Generation:</strong> jsPDF / html2canvas</li>
          <li><strong>Backend:</strong> Firebase / Node.js (if applicable)</li>
          <li><strong>Data Handling:</strong> Form validation & state management</li>
        </ul>
      </section>

      {/* ================= TECH FLOW ================= */}
      <section className="mb-20 max-w-3xl">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>

        <ol className="list-decimal pl-6 text-gray-700 space-y-3">
          <li>User enters business and client details</li>
          <li>Line items are added dynamically</li>
          <li>System calculates totals and taxes in real time</li>
          <li>Invoice is rendered in a print-ready layout</li>
          <li>User exports the invoice as a PDF</li>
        </ol>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="max-w-3xl mb-28">
        <h2 className="text-2xl font-semibold mb-4">Why This Project Matters</h2>
        <p className="text-gray-700 leading-relaxed">
          This project highlights attention to detail, data accuracy, and
          real-world usability. It reflects strong full-stack thinking — from
          UI clarity to reliable calculations and document generation.
        </p>
      </section>

    </div>
  );
}
