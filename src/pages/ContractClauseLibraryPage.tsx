import React, { useState } from 'react';
import { contractClauses, ContractClause } from '../lib/contractClauses';
import { Shield, Search, Copy, Check, Plus, FileText, Download } from 'lucide-react';
import { useExportPDF } from '../hooks/useExportPDF';

export const ContractClauseLibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedClauses, setSelectedClauses] = useState<ContractClause[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // A simple placeholder for variable state mapping: clauseId_variableName -> value
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const { isExporting, exportPDF } = useExportPDF();

  const categories = ['all', ...Array.from(new Set(contractClauses.map(c => c.category)))];

  const filteredClauses = contractClauses.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || c.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleClause = (clause: ContractClause) => {
    if (selectedClauses.find(c => c.id === clause.id)) {
      setSelectedClauses(selectedClauses.filter(c => c.id !== clause.id));
    } else {
      setSelectedClauses([...selectedClauses, clause]);
    }
  };

  const handleVariableChange = (clauseId: string, varName: string, val: string) => {
    setVariableValues(prev => ({
      ...prev,
      [`${clauseId}_${varName}`]: val
    }));
  };

  const renderTemplate = (clause: ContractClause) => {
    let result = clause.template;
    clause.variables.forEach(v => {
      const val = variableValues[`${clause.id}_${v.name}`] || `[${v.placeholder}]`;
      result = result.replace(new RegExp(`\\{\\{${v.name}\\}\\}`, 'g'), val);
    });
    return result;
  };

  const renderFullContractText = () => {
    let text = "FREELANCE AGREEMENT\n\n";
    selectedClauses.forEach((clause, index) => {
      text += `${index + 1}. ${clause.title.toUpperCase()}\n`;
      text += renderTemplate(clause) + "\n\n";
    });
    return text;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
          <Shield className="w-8 h-8 mr-3 text-slate-700" />
          Contract Clause Library
        </h1>
        <p className="text-slate-500 mt-2">Professional, ready-to-use clauses to protect your freelance business.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Library Sidebar */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search clauses (e.g. payment, termination...)"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none"
            />
          </div>

          <div className="flex overflow-x-auto space-x-2 pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap capitalize transition-colors ${
                  activeCategory === cat 
                  ? 'bg-slate-800 text-white' 
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredClauses.map(clause => {
              const isSelected = selectedClauses.some(c => c.id === clause.id);
              
              return (
                <div key={clause.id} className={`bg-white rounded-xl border p-5 transition-all ${isSelected ? 'border-blue-400 ring-1 ring-blue-400 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-slate-900">{clause.title}</h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-500">
                          {clause.category}
                        </span>
                      </div>
                      <p className="text-sm text-slate-500 mt-1">{clause.description}</p>
                    </div>
                    <button 
                      onClick={() => toggleClause(clause)}
                      className={`p-2 rounded-lg transition-colors ${isSelected ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {isSelected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm md:text-base font-serif text-slate-700 whitespace-pre-wrap leading-relaxed relative group">
                    {renderTemplate(clause)}
                    <button 
                      onClick={() => handleCopy(renderTemplate(clause), clause.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white border border-slate-200 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-slate-50 text-slate-500"
                      title="Copy to clipboard"
                    >
                      {copiedId === clause.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {clause.variables.length > 0 && isSelected && (
                    <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {clause.variables.map(v => (
                        <div key={v.name}>
                          <label className="block text-xs font-medium text-slate-500 mb-1">{v.name}</label>
                          <input 
                            type="text" 
                            placeholder={v.placeholder}
                            value={variableValues[`${clause.id}_${v.name}`] || ''}
                            onChange={(e) => handleVariableChange(clause.id, v.name, e.target.value)}
                            className="w-full px-3 py-1.5 border border-slate-300 rounded focus:ring-1 focus:ring-slate-500 text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            
            {filteredClauses.length === 0 && (
              <div className="text-center py-12 text-slate-500 bg-white border border-slate-200 rounded-xl">
                No clauses found matching your search.
              </div>
            )}
          </div>
        </div>

        {/* Contract Builder Side */}
        <div className="w-full lg:w-1/3">
          <div className="bg-slate-900 rounded-2xl p-6 text-white sticky top-24 shadow-xl">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-blue-400" />
              Contract Builder
            </h2>
            
            <div className="space-y-3 mb-6">
              {selectedClauses.length === 0 ? (
                <div className="text-sm text-slate-400 italic py-4 border-dashed border border-slate-700 rounded-lg text-center">
                  Select clauses from the library to build your contract.
                </div>
              ) : (
                <ul className="space-y-2">
                  {selectedClauses.map(c => (
                    <li key={c.id} className="flex justify-between items-center text-sm p-2 bg-slate-800 rounded">
                      <span className="truncate pr-2">{c.title}</span>
                      <button onClick={() => toggleClause(c)} className="text-slate-400 hover:text-rose-400 shrink-0">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="space-y-3">
              <button 
                disabled={selectedClauses.length === 0}
                onClick={() => handleCopy(renderFullContractText(), 'full')}
                className="w-full py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:hover:bg-slate-800 text-white rounded-xl font-medium transition-colors flex justify-center items-center"
              >
                {copiedId === 'full' ? <Check className="w-4 h-4 mr-2 text-emerald-400" /> : <Copy className="w-4 h-4 mr-2" />}
                {copiedId === 'full' ? 'Copied Full Text!' : 'Copy Full Text'}
              </button>
              
              <button 
                disabled={selectedClauses.length === 0 || isExporting}
                onClick={() => exportPDF('preview-contract', 'freelance-contract.pdf')}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-xl font-medium transition-colors flex justify-center items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </button>
            </div>
            
            <p className="text-xs text-slate-400 mt-6 text-center">
              Disclaimer: These clauses are for reference only and do not constitute legal advice.
            </p>
          </div>
        </div>

      </div>

      {/* Off-screen Div for PDF Export */}
      <div className="absolute left-[-9999px] top-0">
        <div id="preview-contract" className="p-12 font-serif text-black bg-white w-[800px]">
          <h1 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest">
            Freelance Agreement
          </h1>
          <div className="space-y-6 text-sm leading-relaxed">
            {selectedClauses.map((clause, idx) => (
              <div key={clause.id}>
                <h2 className="font-bold mb-2 uppercase">{idx + 1}. {clause.title}</h2>
                <div className="whitespace-pre-wrap ml-4">{renderTemplate(clause)}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 grid grid-cols-2 gap-12">
            <div>
              <div className="border-b border-black mb-2 h-10"></div>
              <div className="font-bold text-xs uppercase">Client Signature</div>
              <div className="text-xs mt-1">Date:</div>
            </div>
            <div>
              <div className="border-b border-black mb-2 h-10"></div>
              <div className="font-bold text-xs uppercase">Contractor Signature</div>
              <div className="text-xs mt-1">Date:</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// need Trash2 icon
import { Trash2 } from 'lucide-react';
