'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [creating, setCreating] = useState(false);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    fetchOrganizations();
  }, []);

  const fetchOrganizations = async () => {
    try {
      const { data, error } = await supabase.from('organizations').select('*');
      if (error) throw error;
      setOrganizations(data || []);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    } finally {
      setLoading(false);
    }
  };

  const createOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !orgName) return;

    setCreating(true);
    try {
      const { data, error } = await supabase
        .from('organizations')
        .insert({
          name: orgName,
          email: email,
          plan: 'free',
          monthly_ticket_limit: 10,
        })
        .select()
        .single();

      if (error) throw error;
      setOrganizations([...organizations, data]);
      setEmail('');
      setOrgName('');
    } catch (error) {
      console.error('Error creating organization:', error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4">JLR Support Platform</h1>
          <p className="text-xl text-slate-300">
            AI-powered customer support for your products
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Create Organization</h2>
            <form onSubmit={createOrganization} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., My Company"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-4 py-2 text-white placeholder-slate-400"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-4 py-2 text-white placeholder-slate-400"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={creating}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 font-bold py-2 rounded transition"
              >
                {creating ? 'Creating...' : 'Create Organization'}
              </button>
            </form>
          </div>

          <div className="bg-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-6">Your Organizations</h2>
            {loading ? (
              <p className="text-slate-400">Loading...</p>
            ) : organizations.length === 0 ? (
              <p className="text-slate-400">
                No organizations yet. Create one to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {organizations.map((org: any) => (
                  <div
                    key={org.id}
                    className="bg-slate-600 rounded p-4 border border-slate-500"
                  >
                    <h3 className="font-bold text-lg">{org.name}</h3>
                    <p className="text-sm text-slate-400">{org.email}</p>
                    <div className="mt-2 text-xs text-slate-300">
                      Plan: <span className="font-semibold">{org.plan}</span> •
                      Limit: {org.monthly_ticket_limit} tickets/mo
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-2">🤖 AI-Powered</h3>
              <p className="text-slate-300">
                Claude automatically classifies and responds to support tickets
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">📚 Knowledge Base</h3>
              <p className="text-slate-300">
                Build a knowledge base so AI can provide better responses
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2">💬 Chat Widget</h3>
              <p className="text-slate-300">
                Embed on your products for seamless customer support
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-700 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="bg-slate-800 rounded p-4 text-sm font-mono">
            <p className="text-slate-400">1. Create an organization above</p>
            <p className="text-slate-400">2. Add products in the dashboard</p>
            <p className="text-slate-400">
              3. Get the product ID and embed the chat widget:
            </p>
            <p className="mt-2 text-blue-300">
              &lt;script src="https://jlr-support.vercel.app/chat-widget.js?product_id=YOUR_PRODUCT_ID"&gt;&lt;/script&gt;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
