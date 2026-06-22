import React, { useState } from 'react';
import { Button, Input, Modal, Toast, Loader } from '../components/ui';

export default function Showcase() {
  // Input State
  const [inputValue, setInputValue] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Toast States
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const triggerToast = (message, type) => {
    // Clear existing toast first to force restart animation
    setToastMessage('');
    setTimeout(() => {
      setToastMessage(message);
      setToastType(type);
    }, 50);
  };

  return (
    <main className="min-h-screen py-14 px-6 md:px-12 bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white transition-colors duration-300">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center md:text-left border-b border-slate-200 dark:border-white/10 pb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-violet-600 dark:text-cyan-400 font-semibold mb-2 block">
            GourmetScribe UI Library
          </span>
          <h1 className="text-4xl md:text-5xl font-black font-heading tracking-tight mb-4">
            Component Showcase
          </h1>
          <p className="text-slate-600 dark:text-gray-400 max-w-2xl text-base leading-relaxed">
            Preview, inspect, and test the custom reusable UI component library built for GourmetScribe AI. All components adapt dynamically to light and dark modes.
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Button Section */}
          <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold font-heading mb-3 text-slate-800 dark:text-white">
              1. Buttons
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
              Primary variant is best for call-to-actions, and Secondary is suited for alternative options or cancel actions.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                text="Primary Button" 
                onClick={() => triggerToast("Primary Button Clicked!", "success")} 
                variant="primary" 
              />
              <Button 
                text="Secondary Button" 
                onClick={() => triggerToast("Secondary Button Clicked!", "success")} 
                variant="secondary" 
              />
            </div>
          </section>

          {/* Input Section */}
          <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold font-heading mb-3 text-slate-800 dark:text-white">
              2. Inputs
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
              Interactive input field supporting custom type, placeholder and value change listeners.
            </p>
            <div className="space-y-4">
              <Input 
                placeholder="Type something here..." 
                value={inputValue} 
                onChange={(e) => setInputValue(e.target.value)} 
              />
              {inputValue && (
                <div className="p-3 bg-slate-100 dark:bg-slate-950 rounded-xl text-xs font-mono text-slate-600 dark:text-cyan-400 border border-slate-200 dark:border-white/5 animate-fade-in">
                  <span className="font-semibold text-slate-500 dark:text-gray-500">Live output:</span> {inputValue}
                </div>
              )}
            </div>
          </section>

          {/* Loader Section */}
          <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold font-heading mb-3 text-slate-800 dark:text-white">
              3. Loader
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
              Spinner indicating asynchronous states. Supports small (sm), medium (md), and large (lg) sizing.
            </p>
            <div className="flex items-center gap-8 py-2">
              <div className="flex flex-col items-center gap-2">
                <Loader size="sm" />
                <span className="text-[10px] font-mono text-slate-400">Small</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader size="md" />
                <span className="text-[10px] font-mono text-slate-400">Medium</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Loader size="lg" />
                <span className="text-[10px] font-mono text-slate-400">Large</span>
              </div>
            </div>
          </section>

          {/* Toast Notification Section */}
          <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold font-heading mb-3 text-slate-800 dark:text-white">
              4. Toasts
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
              Floating notifications that render in the lower right. Will auto-dismiss in 4 seconds.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                text="Trigger Success" 
                onClick={() => triggerToast("Successfully processed task! 🎉", "success")} 
                variant="primary" 
              />
              <Button 
                text="Trigger Error" 
                onClick={() => triggerToast("Failed to connect to backend api.", "error")} 
                variant="secondary" 
              />
            </div>
          </section>

          {/* Modal Section */}
          <section className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/5 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all duration-300 md:col-span-2">
            <h2 className="text-xl font-bold font-heading mb-3 text-slate-800 dark:text-white">
              5. Modal
            </h2>
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
              Centered popup containing flexible child content. Fully traps scroll actions on open and handles overlay escape click.
            </p>
            <div>
              <Button 
                text="Open Modal Dialog 💬" 
                onClick={() => setIsModalOpen(true)} 
                variant="primary" 
              />
            </div>
          </section>

        </div>
      </div>

      {/* Modal Demonstration */}
      <Modal 
        isOpen={isModalOpen} 
        title="GourmetScribe Reusable Modal" 
        onClose={() => setIsModalOpen(false)}
      >
        <div className="space-y-4">
          <p>
            This modal dialog component renders nicely using Tailwind CSS with glassmorphism overlays and blur backdrop filters.
          </p>
          <div className="p-4 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-100 dark:border-white/5 text-xs font-mono text-slate-500 dark:text-slate-400">
            <h4 className="font-bold text-slate-700 dark:text-gray-300 mb-2">Props Passed:</h4>
            <ul>
              <li>• isOpen: <span className="text-violet-500 dark:text-cyan-400">true</span></li>
              <li>• title: "GourmetScribe Reusable Modal"</li>
              <li>• onClose: [Function onClose]</li>
            </ul>
          </div>
          <p className="text-xs text-slate-500 dark:text-gray-400">
            Press the Close button on the bottom right, click the top-right cross icon, or click anywhere outside this dialog to close it.
          </p>
        </div>
      </Modal>

      {/* Toast Notification Container */}
      {toastMessage && (
        <Toast 
          message={toastMessage} 
          type={toastType} 
          onClose={() => setToastMessage('')} 
        />
      )}
    </main>
  );
}
