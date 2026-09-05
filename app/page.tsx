'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

interface Organization {
  id: string;
  name: string;
  email: string;
  plan: string;
  monthly_ticket_limit: number;
  created_at: string;
}

export default function Home() {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [orgName, setOrgName] = useState('');
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );

  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      setError('Configuration error: Missing Supabase credentials');
      setLoading(false);
      return;
    }
    fetchOrganizations();
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  const fetchOrganizations = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { data, error: fetchError } = await supabase
        .from('organizations')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError('Failed to load organizations. Please try again.');
        return;
      }

      setOrganizations(data || []);
    } catch (err) {
      setError('An unexpected error occurred while loading organizations');
    } finally {
      setLoading(false);
    }
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidOrgName = (name: string): boolean => {
    return name.length >= 2 && name.length <= 100 && !/[<>"']/g.test(name);
  };

  const createOrganization = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!email.trim() || !orgName.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!isValidOrgName(orgName)) {
      setError('Organization name must be 2-100 characters and contain no special characters');
      return;
    }

    setCreating(true);

    try {
      const { data, error: insertError } = await supabase
        .from('organizations')
        .insert({
          name: orgName.trim(),
          email: email.trim().toLowerCase(),
          plan: 'free',
          monthly_ticket_limit: 10,
        })
        .select()
        .single();

      if (insertError) {
        if (insertError.code === '23505') {
          setError('An organization with this email already exists');
        } else {
          setError('Failed to create organization. Please try again.');
        }
        return;
      }

      if (data) {
        setOrganizations([data, ...organizations]);
        setEmail('');
        setOrgName('');
        setSuccess('Organization created successfully!');
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
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

        {error && (
          <div className="mb-6 bg-red-900 border border-red-700 rounded-lg p-4 text-red-100">
            <p className="font-semibold">⚠️ Error</p>
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 bg-green-900 border border-green-700 rounded-lg p-4 text-green-100">
            <p className="font-semibold">✅ Success</p>
            <p>{success}</p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
            <h2 className="text-2xl font-bold mb-6">Create Organization</h2>
            <form onSubmit={createOrganization} className="space-y-4">
              <div>
                <label htmlFor="orgName" className="block text-sm font-medium mb-2">
                  Organization Name
                </label>
                <input
                  id="orgName"
                  type="text"
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  placeholder="e.g., My Company"
                  maxLength={100}
                  className="w-full bg-slate-600 border border-slate-500 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                  disabled={creating}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-slate-600 border border-slate-500 rounded px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
                  required
                  disabled={creating}
                />
              </div>

              <button
                type="submit"
                disabled={creating || !email || !orgName}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-500 font-bold py-2 rounded transition"
              >
                {creating ? 'Creating...' : 'Create Organization'}
              </button>
            </form>
          </div>

          <div className="bg-slate-700 rounded-lg p-8 border border-slate-600">
            <h2 className="text-2xl font-bold mb-6">Your Organizations</h2>
            {loading ? (
              <p className="text-slate-400">Loading organizations...</p>
            ) : organizations.length === 0 ? (
              <p className="text-slate-400">No organizations yet. Create one to get started!</p>
            ) : (
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="bg-slate-600 rounded p-4 border border-slate-500">
                    <h3 className="font-bold text-lg">{org.name}</h3>
                    <p className="text-sm text-slate-400">{org.email}</p>
                    <div className="mt-2 text-xs text-slate-300">
                      <span className="bg-blue-700 px-2 py-1 rounded font-semibold">
                        {org.plan.toUpperCase()}
                      </span>
                      <span className="ml-2">{org.monthly_ticket_limit} tickets/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-slate-700 rounded-lg p-8 border border-slate-600">
          <h2 className="text-2xl font-bold mb-6">Platform Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-600 rounded-lg p-6 border border-slate-500">
              <h3 className="font-bold text-lg mb-2">🤖 AI-Powered Support</h3>
              <p className="text-slate-300">Claude AI automatically classifies and responds to tickets</p>
            </div>
            <div className="bg-slate-600 rounded-lg p-6 border border-slate-500">
              <h3 className="font-bold text-lg mb-2">📚 Knowledge Base</h3>
              <p className="text-slate-300">Build a searchable knowledge base for accurate AI responses</p>
            </div>
            <div className="bg-slate-600 rounded-lg p-6 border border-slate-500">
              <h3 className="font-bold text-lg mb-2">💬 Embed Anywhere</h3>
              <p className="text-slate-300">Embed the chat widget on any website in minutes</p>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-slate-700 rounded-lg p-8 border border-slate-600">
          <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
          <div className="bg-slate-800 rounded p-4 text-sm text-slate-300 border border-slate-600">
            <p>1. Create an organization above</p>
            <p>2. Navigate to dashboard</p>
            <p>3. Copy your product ID</p>
            <p className="mt-4 text-blue-300">{"<script src=\"https://jlr-support.vercel.app/chat-widget.js?product_id=YOUR_ID\"></script>"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
