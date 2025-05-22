// DocumentCenter.jsx
const documents = [
  { id: 1, name: "Annual Report 2024", link: "/docs/annual2024.pdf" },
  { id: 2, name: "MoU - State Health Dept", link: "/docs/mou-health.pdf" },
];

export function DocumentCenter() {
  return (
    <div className="bg-white rounded-2xl shadow p-4">
      <h2 className="text-xl font-semibold mb-4">Document Repository</h2>
      <ul className="space-y-3">
        {documents.map((doc) => (
          <li key={doc.id}>
            <a href={doc.link} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              {doc.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
