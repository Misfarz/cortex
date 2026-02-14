import { Copy } from "lucide-react";

function Documentation() {

  const exampleCode = `const formData = new FormData();
formData.append("image", file);
formData.append("categories", JSON.stringify(["product", "fashion"]));

const response = await axios.post(
  "https://cortex-server-atcf.onrender.com/cortex/api/moderate",
  formData,
  {
    headers: {
      Authorization: "Bearer YOUR_API_KEY",
    },
  }
);

console.log(response.data);`;

  const curlExample = `curl -X POST https://cortex-server-atcf.onrender.com/cortex/api/moderate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@image.jpg" \\
  -F 'categories=["product","fashion"]'`;

  const responseExample = `{
  "status": "accepted",
  "reason": "Image matches requested category"
}`;

  return (
    <div className="space-y-10 max-w-4xl">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-white">
          Cortex Image Moderation API
        </h1>
        <p className="text-gray-400 mt-2">
          Analyze images for nudity, violence, offensive content and
          category validation before upload.
        </p>
      </div>

      {/* Getting Started */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Getting Started
        </h2>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm text-gray-300">
          <ol className="space-y-2 list-decimal list-inside">
            <li>Create a project from dashboard</li>
            <li>Generate an API key</li>
            <li>Send image to moderation endpoint</li>
          </ol>
        </div>
      </section>

      {/* Endpoint */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Endpoint
        </h2>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm">
          <div className="text-green-400 font-mono">
            POST /cortex/api/moderate
          </div>

          <div className="mt-3 text-gray-400">
            Authorization Header:
          </div>

          <div className="bg-gray-950 mt-2 p-3 rounded font-mono text-xs">
            Authorization: Bearer YOUR_API_KEY
          </div>
        </div>
      </section>

      {/* Request Body */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Request Body
        </h2>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm text-gray-300">
          <div><b>image</b> — image file (required)</div>
          <div><b>categories</b> — JSON array of allowed categories (optional)</div>
        </div>
      </section>

      {/* Example Request */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Example (JavaScript)
        </h2>

        <div className="relative bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300 whitespace-pre-wrap">
          {exampleCode}
        </div>
      </section>

      {/* CURL Example */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Example (cURL)
        </h2>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300 whitespace-pre-wrap">
          {curlExample}
        </div>
      </section>

      {/* Response */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Response
        </h2>

        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-xs text-gray-300 whitespace-pre-wrap">
          {responseExample}
        </div>
      </section>

      {/* Errors */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-white">
          Error Responses
        </h2>

        <div className="bg-gray-900 border border-gray-800 rounded-lg p-4 text-sm text-gray-300 space-y-2">
          <div><b>401</b> — Invalid or missing API key</div>
          <div><b>400</b> — Image missing</div>
          <div><b>429</b> — Rate limit exceeded</div>
          <div><b>500</b> — Server error</div>
        </div>
      </section>

    </div>
  );
}

export default Documentation;

