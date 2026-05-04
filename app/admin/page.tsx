"use client";

import { useState, useEffect } from "react";
import { Eye, Trash2, CheckCircle, Clock, XCircle, RefreshCw, ArrowLeft, Search, Filter } from "lucide-react";
import Link from "next/link";

interface Inquiry {
  _id: string;
  studentName: string;
  parentName: string;
  email: string;
  phone: string;
  class: string;
  message: string;
  status: "pending" | "reviewed" | "contacted" | "enrolled" | "rejected";
  createdAt: string;
}

const statusColors: Record<string, { bg: string; text: string; icon: typeof Clock }> = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", icon: Clock },
  reviewed: { bg: "bg-blue-100", text: "text-blue-800", icon: Eye },
  contacted: { bg: "bg-purple-100", text: "text-purple-800", icon: CheckCircle },
  enrolled: { bg: "bg-green-100", text: "text-green-800", icon: CheckCircle },
  rejected: { bg: "bg-red-100", text: "text-red-800", icon: XCircle },
};

export default function AdminDashboard() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admissions");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setInquiries(data.inquiries || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch("/api/admissions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      setInquiries((prev) =>
        prev.map((inq) => (inq._id === id ? { ...inq, status: status as Inquiry["status"] } : inq))
      );
      if (selectedInquiry?._id === id) {
        setSelectedInquiry({ ...selectedInquiry, status: status as Inquiry["status"] });
      }
    } catch (err) {
      alert("Failed to update status");
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const response = await fetch(`/api/admissions?id=${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete");
      setInquiries((prev) => prev.filter((inq) => inq._id !== id));
      if (selectedInquiry?._id === id) setSelectedInquiry(null);
    } catch (err) {
      alert("Failed to delete inquiry");
    }
  };

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: inquiries.length,
    pending: inquiries.filter((i) => i.status === "pending").length,
    reviewed: inquiries.filter((i) => i.status === "reviewed").length,
    contacted: inquiries.filter((i) => i.status === "contacted").length,
    enrolled: inquiries.filter((i) => i.status === "enrolled").length,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Site
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-xl font-bold text-gray-900">Admission Inquiries</h1>
          </div>
          <button
            onClick={fetchInquiries}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          {[
            { label: "Total", value: stats.total, color: "bg-gray-100 text-gray-800" },
            { label: "Pending", value: stats.pending, color: "bg-yellow-100 text-yellow-800" },
            { label: "Reviewed", value: stats.reviewed, color: "bg-blue-100 text-blue-800" },
            { label: "Contacted", value: stats.contacted, color: "bg-purple-100 text-purple-800" },
            { label: "Enrolled", value: stats.enrolled, color: "bg-green-100 text-green-800" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-xl p-4 ${stat.color}`}>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="contacted">Contacted</option>
              <option value="enrolled">Enrolled</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {error ? (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
            <p className="text-red-700">{error}</p>
            <button
              onClick={fetchInquiries}
              className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
            <p className="text-gray-500">
              {inquiries.length === 0 ? "No admission inquiries yet." : "No inquiries match your search."}
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-4">
              {filteredInquiries.map((inquiry) => {
                const StatusIcon = statusColors[inquiry.status]?.icon || Clock;
                return (
                  <div
                    key={inquiry._id}
                    onClick={() => setSelectedInquiry(inquiry)}
                    className={`bg-white border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${
                      selectedInquiry?._id === inquiry._id
                        ? "border-blue-500 ring-2 ring-blue-100"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-900 truncate">{inquiry.studentName}</h3>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                              statusColors[inquiry.status]?.bg
                            } ${statusColors[inquiry.status]?.text}`}
                          >
                            <StatusIcon className="w-3 h-3" />
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">Class: {inquiry.class}</p>
                        <p className="text-sm text-gray-500 mt-1">Parent: {inquiry.parentName}</p>
                      </div>
                      <p className="text-xs text-gray-400 whitespace-nowrap">
                        {new Date(inquiry.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detail Panel */}
            <div className="lg:col-span-1">
              {selectedInquiry ? (
                <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-bold text-lg text-gray-900">Inquiry Details</h2>
                    <button
                      onClick={() => deleteInquiry(selectedInquiry._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete inquiry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Student Name</p>
                      <p className="font-medium text-gray-900">{selectedInquiry.studentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Parent Name</p>
                      <p className="font-medium text-gray-900">{selectedInquiry.parentName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Class</p>
                      <p className="font-medium text-gray-900">{selectedInquiry.class}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</p>
                      <a
                        href={`mailto:${selectedInquiry.email}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {selectedInquiry.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</p>
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="font-medium text-blue-600 hover:underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    </div>
                    {selectedInquiry.message && (
                      <div>
                        <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Message</p>
                        <p className="text-gray-700 text-sm">{selectedInquiry.message}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Submitted</p>
                      <p className="text-gray-700 text-sm">
                        {new Date(selectedInquiry.createdAt).toLocaleString("en-IN", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Update Status</p>
                      <div className="flex flex-wrap gap-2">
                        {["pending", "reviewed", "contacted", "enrolled", "rejected"].map((status) => (
                          <button
                            key={status}
                            onClick={() => updateStatus(selectedInquiry._id, status)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
                              selectedInquiry.status === status
                                ? `${statusColors[status]?.bg} ${statusColors[status]?.text} ring-2 ring-offset-1 ring-current`
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                          >
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gray-100 border border-gray-200 rounded-xl p-6 text-center text-gray-500">
                  <Eye className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Select an inquiry to view details</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
