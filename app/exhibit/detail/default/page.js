export default function DefaultExhibitionDetail() {
  return (
    <div className="min-h-screen bg-[url('/chu-images/img-bg.jpg')] bg-cover bg-fixed">
      <div className="min-h-screen bg-black bg-opacity-50">
        <main className="pt-[80px]">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-white mb-6">Exhibition Details</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <p className="text-xl mb-4">Welcome to our Exhibition Details page!</p>
              <p className="mb-4">This is a default view when no specific exhibition is selected.</p>
              <p>You can use this page to:</p>
              <ul className="list-disc list-inside mb-4">
                <li>Showcase featured exhibitions</li>
                <li>Provide general information about your exhibitions</li>
                <li>Display a list or grid of all available exhibitions</li>
              </ul>
              <p>Select a specific exhibition to view its details.</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

