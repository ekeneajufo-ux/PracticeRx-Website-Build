export function CalendarWidget() {
  return (
    <div className="w-full min-h-screen bg-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Schedule Your Kickoff Call</h1>
        <p className="text-gray-600 text-center mb-8">Let's discuss your practice's digital transformation</p>
        
        <div style={{ width: '100%', minHeight: '600px', overflow: 'hidden' }}>
          <iframe 
            src="https://www.practicerxconsulting.com/widget/booking/IzDYuXLlWCrKUe5a5ZTa" 
            style={{ width: '100%', border: 'none', overflow: 'hidden', minHeight: '600px' }}
            scrolling="no" 
            id="IzDYuXLlWCrKUe5a5ZTa_1780787933066"
          ></iframe>
        </div>
        
        <script src="https://www.practicerxconsulting.com/js/form_embed.js" type="text/javascript"></script>
      </div>
    </div>
  );
}