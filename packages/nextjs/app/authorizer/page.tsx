"use client";

import { useState } from "react";
import { 
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  EyeIcon,
  XMarkIcon,
  UserIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

interface Certification {
  id: string;
  title: string;
  description: string;
  requestedBy: string;
  requestedByWallet: string;
  date: string;
  status: "Pendiente" | "Aprobado" | "Rechazado";
  level: number;
  pdfUrl?: string;
  approvedBy?: string[];
  rejectedBy?: string[];
}

export default function AuthorizerPage() {
  const [authorizerLevel] = useState(1); // This would come from user authentication
  const [authorizerRole] = useState("Admin Principal");
  const [authorizerWallet] = useState("0x1234...5678");

  const [pendingCertifications, setPendingCertifications] = useState<Certification[]>([
    {
      id: "1",
      title: "Certificación en Desarrollo Web",
      description: "Certificación completa en tecnologías web modernas",
      requestedBy: "Carlos López",
      requestedByWallet: "0xabcd...1234",
      date: "1/2/2024",
      status: "Pendiente",
      level: 1,
      pdfUrl: "/sample-certification.pdf"
    },
    {
      id: "2", 
      title: "Certificación en Blockchain",
      description: "Certificación en desarrollo de smart contracts",
      requestedBy: "Ana Martínez",
      requestedByWallet: "0xefgh...5678",
      date: "2/2/2024",
      status: "Pendiente",
      level: 1,
      pdfUrl: "/sample-certification.pdf"
    }
  ]);

  const [approvedToday] = useState(0);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<Certification | null>(null);

  const viewDetails = (certification: Certification) => {
    setSelectedCertification(certification);
    setShowDetailsModal(true);
  };

  const approveCertification = (certificationId: string) => {
    setPendingCertifications(prev => 
      prev.map(cert => 
        cert.id === certificationId 
          ? { 
              ...cert, 
              status: cert.level === 3 ? "Aprobado" : "Pendiente",
              level: cert.level + 1,
              approvedBy: [...(cert.approvedBy || []), authorizerWallet]
            }
          : cert
      )
    );
    setShowDetailsModal(false);
    setSelectedCertification(null);
  };

  const rejectCertification = (certificationId: string) => {
    setPendingCertifications(prev => 
      prev.map(cert => 
        cert.id === certificationId 
          ? { 
              ...cert, 
              status: "Rechazado",
              rejectedBy: [...(cert.rejectedBy || []), authorizerWallet]
            }
          : cert
      )
    );
    setShowDetailsModal(false);
    setSelectedCertification(null);
  };

  // Filter certifications based on authorizer level
  const filteredCertifications = pendingCertifications.filter(
    cert => cert.level === authorizerLevel && cert.status === "Pendiente"
  );

  return (
    <div className="min-h-screen bg-gray-50">
      

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Autorizador</h1>
            <p className="text-gray-600">
              Nivel de autorización: {authorizerLevel} | {authorizerRole}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <ClockIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pendientes</p>
                  <p className="text-2xl font-bold text-orange-600">{filteredCertifications.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Aprobadas Hoy</p>
                  <p className="text-2xl font-bold text-green-600">{approvedToday}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Nivel</p>
                  <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-blue-600 text-white">
                    Autorizador
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Certifications Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Certificaciones Pendientes de Aprobación</h2>
              <p className="text-gray-600">Certificaciones que requieren tu autorización de nivel {authorizerLevel}</p>
            </div>
            
            <div className="p-6">
              {filteredCertifications.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">No hay certificaciones pendientes</h3>
                  <p className="mt-2 text-gray-600">Todas las certificaciones están al día</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredCertifications.map((certification) => (
                    <div key={certification.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{certification.title}</h3>
                        <p className="text-sm text-gray-600">Solicitado por: {certification.requestedBy}</p>
                        <p className="text-sm text-gray-500">Fecha: {certification.date}</p>
                        <p className="text-sm text-gray-500">Wallet: {certification.requestedByWallet}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                          Nivel {certification.level}
                        </span>
                        <button
                          onClick={() => viewDetails(certification)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>Ver Detalles</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedCertification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Detalles de Certificación</h2>
                <p className="text-gray-600">Revisa la información antes de aprobar o rechazar</p>
              </div>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Certification Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información de la Certificación</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Título</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCertification.title}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descripción</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCertification.description}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nivel Actual</label>
                      <p className="mt-1 text-sm text-gray-900">Nivel {selectedCertification.level}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha de Solicitud</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCertification.date}</p>
                    </div>
                  </div>
                </div>

                {/* Applicant Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del Solicitante</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedCertification.requestedBy}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Wallet Address</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedCertification.requestedByWallet}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estado</label>
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        {selectedCertification.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* PDF Viewer */}
              {selectedCertification.pdfUrl && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Documento PDF</h3>
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center space-x-3">
                      <DocumentTextIcon className="h-8 w-8 text-red-500" />
                      <div>
                        <p className="font-medium text-gray-900">Certificación_{selectedCertification.id}.pdf</p>
                        <p className="text-sm text-gray-600">Documento de certificación subido por el administrador</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-2">
                        <DocumentTextIcon className="h-4 w-4" />
                        <span>Ver PDF</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Approval History */}
              {selectedCertification.approvedBy && selectedCertification.approvedBy.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Historial de Aprobaciones</h3>
                  <div className="space-y-2">
                    {selectedCertification.approvedBy.map((approver, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                        <CheckCircleIcon className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium text-gray-900">Aprobado por Nivel {index + 1}</p>
                          <p className="text-xs text-gray-600 font-mono">{approver}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={() => rejectCertification(selectedCertification.id)}
                className="px-6 py-2 border border-red-600 text-red-600 rounded-lg hover:bg-red-50"
              >
                Rechazar
              </button>
              <button
                onClick={() => approveCertification(selectedCertification.id)}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                {selectedCertification.level === 3 ? "Aprobar y Emitir NFT" : "Aprobar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 