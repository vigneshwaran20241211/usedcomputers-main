import { useState } from 'react';

function Ebilling() {
  const [documentType, setDocumentType] = useState('Invoice');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="bg-blue-50 p-4 rounded-lg">
        <h3>e-Billing - TIERRA RESOURCES SDN BHD : 060874</h3>
      <div className="flex justify-between items-center mb-4">
        <DocumentTypeDropdown 
          selected={documentType} 
          onChange={setDocumentType} 
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Sync Invoices
        </button>
      </div>

      <div className="mb-4">
        <SearchInput 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      <div className="mb-4">
        <AdvancedFiltersDropdown />
      </div>

      <DataTable 
        data={[]} // Replace with actual data
        emptyStateMessage="No data available" 
      />

      <div className="flex justify-end">
        {/* Pagination component */}
      </div>
    </div>
  );
}

function DocumentTypeDropdown({ selected, onChange }) {
  return (
    <select 
      value={selected} 
      onChange={onChange} 
      className="border border-gray-300 rounded px-4 py-2"
    >
      <option value="Invoice">Invoice</option>
      <option value="Monthly Statement">Monthly Statement</option>
      <option value="Official Receipt">Official Receipt</option>
      <option value="Credit Note">Credit Note</option>
      <option value="Debit Note">Debit Note</option>
    </select>
  );
}

function SearchInput({ value, onChange }) {
  return (
    <input 
      type="text" 
      value={value} 
      onChange={onChange} 
      placeholder="Search" 
      className="border border-gray-300 rounded px-4 py-2 w-full" 
    />
  );
}

function AdvancedFiltersDropdown() {
  // Implement dropdown logic here
}

function DataTable({ data, emptyStateMessage }) {
  if (data.length === 0) {
    return <p className="text-center">{emptyStateMessage}</p>;
  }

  // Render table rows based on data
}

export default Ebilling;