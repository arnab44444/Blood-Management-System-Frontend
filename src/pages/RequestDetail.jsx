import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { bloodRequestsApi, requestContactsApi, adminApi } from '../api';
import { useAuth } from '../provider/authContext.js';

export default function RequestDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [request, setRequest] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadRequest = () => {
    if (!id) return;
    bloodRequestsApi.get(id).then(({ data }) => setRequest(data)).catch(() => setRequest(null)).finally(() => setLoading(false));
  };

  const loadContacts = () => {
    if (!id) return;
    requestContactsApi.getByRequest(id).then(({ data }) => setContacts(data)).catch(() => setContacts([]));
  };

  useEffect(() => {
    if (!id) return;
    loadRequest();
  }, [id]);

  useEffect(() => {
    if (!id || !request) return;
    loadContacts();
  }, [id, request]);

  if (loading || !request) return <span className="loading loading-spinner loading-lg text-error" />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-4">Request: {request.patientName}</h1>
      <div className="card bg-base-100 shadow mb-6">
        <div className="card-body">
          <p><span className="badge badge-error">{request.bloodGroup}</span> · {request.bags} bag(s)</p>
          <p>{request.hospitalName}, {request.location}</p>
          <p>{request.requiredDate ? new Date(request.requiredDate).toLocaleDateString() : ''} {request.requiredTime}</p>
          <p>Level: {request.emergencyLevel} · Status: {request.status}</p>
        </div>
      </div>
      <h2 className="text-lg font-bold mb-2">Donors who responded</h2>
      {user?.role === 'admin' && request?.status === 'approved' && contacts.some((c) => !c.adminApproved) && (
        <div className="mb-4">
          <button
            type="button"
            className="btn btn-error btn-sm"
            onClick={async () => {
              await adminApi.unlockContacts(id);
              loadContacts();
            }}
          >
            Unlock all donor contacts (show numbers to patient)
          </button>
        </div>
      )}
      <div className="space-y-2">
        {contacts.map((c) => (
          <div key={c._id} className="flex justify-between items-center p-3 bg-base-100 rounded shadow">
            <div>
              <p className="font-medium">{c.donor?.fullName} · {c.donor?.bloodGroup}</p>
              <p className="text-sm">{c.donor?.district}{c.donor?.area ? `, ${c.donor?.area}` : ''}</p>
              {c.adminApproved && c.donor?.mobile && <p className="text-sm text-success font-medium">Contact: {c.donor.mobile}</p>}
              {!c.adminApproved && user?.role === 'admin' && <p className="text-xs text-warning">Contact hidden from patient until approved</p>}
            </div>
            <div className="flex gap-2">
              {!c.adminApproved && user?.role === 'admin' && (
                <button type="button" className="btn btn-sm btn-error" onClick={async () => { await requestContactsApi.approve(c._id); loadContacts(); }}>Approve contact</button>
              )}
              {user?.role === 'admin' && request?.status !== 'completed' && c.donorId && (
                <button
                  type="button"
                  className="btn btn-sm btn-success"
                  onClick={async () => {
                    try {
                      await adminApi.completeDonation(id, c.donorId?.toString?.() || c.donorId);
                      loadRequest();
                      loadContacts();
                    } catch (e) {
                      alert(e.response?.data?.message || 'Failed');
                    }
                  }}
                >
                  Mark donated
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {contacts.length === 0 && <p className="text-base-content/70">No donor responses yet.</p>}
    </div>
  );
}
