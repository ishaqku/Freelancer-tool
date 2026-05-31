import React, { useState, useEffect } from 'react';
import { useExportPDF } from '../hooks/useExportPDF';
import { FileText, Download, Plus, Trash2, Printer } from 'lucide-react';
import { format, addDays } from 'date-fns';

export const InvoiceGeneratorPage = () => {
  const { isExporting, exportPDF } = useExportPDF();
  const [hourlyRate, setHourlyRate] = useState(45);
  
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    date: format(new Date(), 'yyyy-MM-dd'),
    dueDate: format(addDays(new Date(), 14), 'yyyy-MM-dd'),
    myDetails: {
      name: '',
      email: '',
      address: '',
    },
    clientDetails: {
      name: '',
      email: '',
      address: '',
    },
    items: [
      { id: 1, description: 'Freelance Services', qty: 10, rate: 45 }
    ],
    notes: 'Thank you for your business. Please send payment within 14 days.',
    terms: 'Late payments may be subject to a 2% monthly fee.'
  });

  useEffect(() => {
    let initialRate = 45;
    const customRate = localStorage.getItem('userHourlyRate');
    if (customRate) {
      initialRate = parseFloat(customRate);
      setHourlyRate(initialRate);
      setInvoice(prev => ({
        ...prev,
        items: [{ id: 1, description: 'Freelance Services', qty: 10, rate: initialRate }]
      }));
    } else {
      const calcData = localStorage.getItem('calculatorState');
      if (calcData) {
        try {
          const parsed = JSON.parse(calcData);
          if (parsed.calculatedRate) {
            setHourlyRate(parsed.calculatedRate);
            setInvoice(prev => ({
              ...prev,
              items: [{ id: 1, description: 'Freelance Services', qty: 10, rate: parsed.calculatedRate }]
            }));
          }
        } catch (e) {
          console.error(e);
        }
      }
    }
    
    const saved = localStorage.getItem('latestInvoiceValues');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setInvoice(prev => ({
          ...prev,
          myDetails: parsed.myDetails || prev.myDetails,
        }));
      } catch(e) {}
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('latestInvoiceValues', JSON.stringify(invoice));
    alert('Invoice details saved locally.');
  };

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now(), description: '', qty: 1, rate: hourlyRate }]
    }));
  };

  const removeItem = (id: number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const updateItem = (id: number, field: string, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const handleUpdate = (field: string, value: any, section?: string) => {
    setInvoice(prev => {
      if (section) {
        return { ...prev, [section]: { ...(prev as any)[section], [field]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  const subtotal = invoice.items.reduce((sum, item) => sum + (item.qty * item.rate), 0);

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
      {/* Edit Form */}
      <div className="w-full lg:w-1/2 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center">
            <FileText className="w-8 h-8 mr-3 text-emerald-600" />
            Invoice Generator
          </h1>
          <p className="text-slate-500 mt-2">Create professional invoices connected to your rate.</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Your Details</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Your Name / Company" value={invoice.myDetails.name} onChange={e => handleUpdate('name', e.target.value, 'myDetails')} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                <input type="email" placeholder="Your Email" value={invoice.myDetails.email} onChange={e => handleUpdate('email', e.target.value, 'myDetails')} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                <textarea placeholder="Your Address / Details" value={invoice.myDetails.address} onChange={e => handleUpdate('address', e.target.value, 'myDetails')} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20 resize-none"></textarea>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-3">Client Details</h3>
              <div className="space-y-3">
                <input type="text" placeholder="Client Name / Company" value={invoice.clientDetails.name} onChange={e => handleUpdate('name', e.target.value, 'clientDetails')} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                <input type="email" placeholder="Client Email" value={invoice.clientDetails.email} onChange={e => handleUpdate('email', e.target.value, 'clientDetails')} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                <textarea placeholder="Client Address" value={invoice.clientDetails.address} onChange={e => handleUpdate('address', e.target.value, 'clientDetails')} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20 resize-none"></textarea>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pb-4 border-b border-slate-100">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Invoice #</label>
              <input type="text" value={invoice.invoiceNumber} onChange={e => handleUpdate('invoiceNumber', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Issue Date</label>
              <input type="date" value={invoice.date} onChange={e => handleUpdate('date', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Due Date</label>
              <input type="date" value={invoice.dueDate} onChange={e => handleUpdate('dueDate', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-slate-900 mb-3">Line Items</h3>
            <div className="space-y-3">
              {invoice.items.map((item, idx) => (
                <div key={item.id} className="flex items-center gap-2">
                  <input type="text" placeholder="Description" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                  <input type="number" placeholder="Qty (hrs)" value={item.qty} onChange={e => updateItem(item.id, 'qty', parseFloat(e.target.value) || 0)} className="w-20 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                  <input type="number" placeholder="Rate" value={item.rate} onChange={e => updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)} className="w-24 px-3 py-2 border border-slate-300 rounded-lg text-sm" />
                  <button onClick={() => removeItem(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addItem} className="mt-3 text-sm font-medium text-emerald-600 hover:text-emerald-700 flex items-center">
              <Plus className="w-4 h-4 mr-1" /> Add Line Item
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 pb-4 border-t border-slate-100 pt-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Notes</label>
              <textarea value={invoice.notes} onChange={e => handleUpdate('notes', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20 resize-none"></textarea>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Terms</label>
              <textarea value={invoice.terms} onChange={e => handleUpdate('terms', e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm h-20 resize-none"></textarea>
            </div>
          </div>
          
          <div className="flex gap-3">
            <button onClick={handleSave} className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded-xl font-medium transition-colors">
              Save Default Details
            </button>
            <button 
              onClick={() => exportPDF('invoice-preview', `${invoice.invoiceNumber}.pdf`)} 
              disabled={isExporting}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-colors flex items-center justify-center"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className="w-full lg:w-1/2">
        <div className="sticky top-24">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-wider">Preview</h2>
          </div>
          
          <div className="bg-white p-1 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            {/* THIS IS THE ELEMENT THAT GETS CAPTURED BY HTML2CANVAS */}
            <div id="invoice-preview" className="bg-white p-8 md:p-12 text-slate-900 aspect-[1/1.414] w-full" style={{ minHeight: '800px', fontSize: '14px' }}>
              
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-4xl font-bold tracking-tighter text-slate-900 mb-2">INVOICE</h1>
                  <p className="text-slate-500 text-sm">#{invoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">{invoice.myDetails.name || 'Your Name'}</div>
                  <div className="text-slate-500 text-sm">{invoice.myDetails.email || 'email@example.com'}</div>
                  <div className="text-slate-500 text-sm whitespace-pre-wrap">{invoice.myDetails.address || 'Your Address'}</div>
                </div>
              </div>

              <div className="flex justify-between items-end mb-12">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bill To</div>
                  <div className="font-bold text-lg">{invoice.clientDetails.name || 'Client Name'}</div>
                  <div className="text-slate-500 text-sm">{invoice.clientDetails.email || 'client@example.com'}</div>
                  <div className="text-slate-500 text-sm whitespace-pre-wrap">{invoice.clientDetails.address || 'Client Address'}</div>
                </div>
                <div className="text-right space-y-2">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider inline-block w-24">Date</span>
                    <span className="font-medium inline-block w-24">{invoice.date}</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider inline-block w-24">Due Date</span>
                    <span className="font-medium inline-block w-24">{invoice.dueDate}</span>
                  </div>
                </div>
              </div>

              <table className="w-full mb-12">
                <thead>
                  <tr className="border-b-2 border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider text-left">
                    <th className="pb-3 w-3/5">Description</th>
                    <th className="pb-3 text-center">Qty / Hrs</th>
                    <th className="pb-3 text-right">Rate</th>
                    <th className="pb-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map(item => (
                    <tr key={item.id}>
                      <td className="py-4 text-slate-800">{item.description || 'Item description'}</td>
                      <td className="py-4 text-center text-slate-600">{item.qty}</td>
                      <td className="py-4 text-right text-slate-600">${item.rate.toFixed(2)}</td>
                      <td className="py-4 text-right font-medium text-slate-900">${(item.qty * item.rate).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-16">
                <div className="w-1/2 space-y-3">
                  <div className="flex justify-between text-slate-500 border-b border-slate-100 pb-3">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-2xl pt-2 text-emerald-700">
                    <span>Total</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-sm mt-auto pt-16 border-t border-slate-200">
                {invoice.notes && (
                  <div>
                    <div className="font-bold text-slate-800 mb-1">Notes</div>
                    <div className="text-slate-500 leading-relaxed">{invoice.notes}</div>
                  </div>
                )}
                {invoice.terms && (
                  <div>
                    <div className="font-bold text-slate-800 mb-1">Terms</div>
                    <div className="text-slate-500 leading-relaxed">{invoice.terms}</div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
