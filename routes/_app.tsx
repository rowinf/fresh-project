import { type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>fresh-project</title>
        <link
          rel="icon"
          type="image/png"
          href={asset(`/images/favicon-32x32.png`)}
          sizes="32x32"
        />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <nav class="w-full flex justify-between items-center mb-8">
          <div class="flex gap-8">
            <a
              href="#"
              class="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <span class="material-icons">person</span>
              Profile Details
            </a>
            <a
              href="#"
              class="flex items-center gap-2 text-gray-700 hover:text-gray-900"
            >
              <span class="material-icons">link</span>
              Links
            </a>
          </div>
          <a href="#" class="text-gray-700 hover:text-gray-900">
            Preview
          </a>
        </nav>
        <Component />
      </body>
    </html>
  );
}
