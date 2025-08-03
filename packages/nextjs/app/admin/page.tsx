"use client";

import { useState } from "react";
import { 
  HomeIcon, 
  BugAntIcon, 
  WalletIcon, 
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  UserGroupIcon,
  PlusIcon,
  EyeIcon,
  XMarkIcon,
  UserIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

interface Member {
  id: string;
  name: string;
  wallet: string;
  pdfFile?: File;
  pdfIpfsHash?: string;
}

interface Role {
  id: string;
  name: string;
  wallet: string;
}

interface Authorizer {
  id: string;
  name: string;
  wallet: string;
  level: string;
  role: string;
}

export default function AdminPage() {
  const [stats] = useState({
    pending: 2,
    approved: 3,
    members: 3,
    authorizers: 2
  });

  const [recentCertifications] = useState([
    {
      id: 1,
      title: "Certificación en Desarrollo Web",
      requestedBy: "Carlos López",
      requestedByWallet: "0x1234...5678",
      date: "1/2/2024",
      status: "Pendiente",
      description: "Certificación completa en tecnologías web modernas incluyendo HTML, CSS, JavaScript y frameworks",
      currentLevel: 1,
      totalLevels: 3,
      authorizations: [
        { level: 1, status: "Pendiente", authorizer: "Dr. García", wallet: "0xabcd...1234", role: "Decano" },
        { level: 2, status: "Pendiente", authorizer: "Dr. Martínez", wallet: "0xefgh...5678", role: "Secretario" },
        { level: 3, status: "Pendiente", authorizer: "Dr. López", wallet: "0xijkl...9012", role: "Rector" }
      ],
      pdfUrl: "/sample-certification.pdf"
    },
    {
      id: 2,
      title: "Certificación en Blockchain",
      requestedBy: "Ana Martínez",
      requestedByWallet: "0x9876...5432",
      date: "2/2/2024",
      status: "Pendiente",
      description: "Certificación en desarrollo de smart contracts y tecnologías blockchain",
      currentLevel: 1,
      totalLevels: 3,
      authorizations: [
        { level: 1, status: "Pendiente", authorizer: "Dr. García", wallet: "0xabcd...1234", role: "Decano" },
        { level: 2, status: "Pendiente", authorizer: "Dr. Martínez", wallet: "0xefgh...5678", role: "Secretario" },
        { level: 3, status: "Pendiente", authorizer: "Dr. López", wallet: "0xijkl...9012", role: "Rector" }
      ],
      pdfUrl: "/sample-certification.pdf"
    }
  ]);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showCertificationDetails, setShowCertificationDetails] = useState(false);
  const [selectedCertification, setSelectedCertification] = useState<any>(null);
  
  // Form data
  const [certificationData, setCertificationData] = useState({
    title: "",
    description: ""
  });
  
  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState({ name: "", wallet: "", pdfFile: undefined as File | undefined });
  
  const [roles, setRoles] = useState<Role[]>([]);
  const [newRole, setNewRole] = useState({ name: "", wallet: "" });
  
  const [authorizers, setAuthorizers] = useState<Authorizer[]>([]);
  const [newAuthorizer, setNewAuthorizer] = useState({
    name: "",
    wallet: "",
    level: "Nivel 1",
    role: ""
  });

  const addMember = () => {
    if (newMember.name && newMember.wallet) {
      // Simulate IPFS upload if PDF is provided
      if (newMember.pdfFile) {
        // Mock IPFS hash generation
        const mockIpfsHash = `Qm${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
        setMembers([...members, { 
          ...newMember, 
          id: Date.now().toString(),
          pdfIpfsHash: mockIpfsHash
        }]);
      } else {
        setMembers([...members, { ...newMember, id: Date.now().toString() }]);
      }
      setNewMember({ name: "", wallet: "", pdfFile: undefined });
    }
  };

  const removeMember = (id: string) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const addRole = () => {
    if (newRole.name && newRole.wallet) {
      setRoles([...roles, { ...newRole, id: Date.now().toString() }]);
      setNewRole({ name: "", wallet: "" });
    }
  };

  const removeRole = (id: string) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const addAuthorizer = () => {
    if (newAuthorizer.name && newAuthorizer.wallet && newAuthorizer.role) {
      setAuthorizers([...authorizers, { ...newAuthorizer, id: Date.now().toString() }]);
      setNewAuthorizer({
        name: "",
        wallet: "",
        level: "Nivel 1",
        role: ""
      });
    }
  };

  const removeAuthorizer = (id: string) => {
    setAuthorizers(authorizers.filter(authorizer => authorizer.id !== id));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const createCertification = () => {
    // Here you would typically save the certification data
    console.log("Creating certification:", {
      ...certificationData,
      members,
      roles,
      authorizers
    });
    setShowModal(false);
    setCurrentStep(1);
    // Reset all form data
    setCertificationData({ title: "", description: "" });
    setMembers([]);
    setRoles([]);
    setAuthorizers([]);
  };

  const viewCertificationDetails = (certification: any) => {
    setSelectedCertification(certification);
    setShowCertificationDetails(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administrador</h1>
            <p className="text-gray-600">Gestiona certificaciones, usuarios y autorizadores</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificaciones Pendientes</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificaciones Aprobadas</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UserGroupIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Miembros</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.members}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <ShieldCheckIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Autorizadores</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.authorizers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setShowModal(true)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Agregar Certificación</span>
            </button>
            <button className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 flex items-center space-x-2">
              <EyeIcon className="h-5 w-5" />
              <span>Ver Todas</span>
            </button>
          </div>

          {/* Recent Certifications */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Certificaciones Recientes</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                                 {recentCertifications.map((cert) => (
                   <div key={cert.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer" onClick={() => viewCertificationDetails(cert)}>
                     <div>
                       <h3 className="font-medium text-gray-900">{cert.title}</h3>
                       <p className="text-sm text-gray-600">Solicitado por: {cert.requestedBy}</p>
                     </div>
                     <div className="text-right">
                       <p className="text-sm text-gray-600">{cert.date}</p>
                       <div className="flex items-center space-x-2">
                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                           cert.status === "Pendiente" 
                             ? "bg-yellow-100 text-yellow-800" 
                             : "bg-green-100 text-green-800"
                         }`}>
                           {cert.status}
                         </span>
                         <EyeIcon className="h-4 w-4 text-gray-400" />
                       </div>
                     </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Crear Nueva Certificación</h2>
                <p className="text-gray-600">Configura todos los elementos necesarios para la nueva certificación</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex justify-center p-4 border-b">
              <div className="flex space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {currentStep === 1 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Información Básica</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Título de la Certificación *
                      </label>
                      <input
                        type="text"
                        value={certificationData.title}
                        onChange={(e) => setCertificationData({...certificationData, title: e.target.value})}
                        placeholder="Ej: Certificación en Desarrollo Web"
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Descripción *
                      </label>
                      <textarea
                        value={certificationData.description}
                        onChange={(e) => setCertificationData({...certificationData, description: e.target.value})}
                        placeholder="Describe el contenido y objetivos de la certificación"
                        rows={4}
                        className="w-full px-3 py-2 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Configurar Miembros</h3>
                  <div className="bg-white rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Agregar Nuevo Miembro</h4>
                    <p className="text-gray-600 mb-4">Agrega miembros con sus wallets correspondientes</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre del Miembro
                        </label>
                        <input
                          type="text"
                          value={newMember.name}
                          onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                          placeholder="Nombre completo"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Wallet
                        </label>
                        <input
                          type="text"
                          value={newMember.wallet}
                          onChange={(e) => setNewMember({...newMember, wallet: e.target.value})}
                          placeholder="0x..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        PDF del Miembro
                      </label>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setNewMember({...newMember, pdfFile: file});
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {newMember.pdfFile && (
                        <p className="text-sm text-green-600 mt-1">
                          ✓ Archivo seleccionado: {newMember.pdfFile.name}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={addMember}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <UserIcon className="h-5 w-5" />
                      <span>Agregar Miembro</span>
                    </button>
                  </div>

                  {/* Members List */}
                  {members.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg border p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Miembros Agregados</h4>
                      <div className="space-y-3">
                        {members.map((member) => (
                          <div key={member.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{member.name}</p>
                              <p className="text-sm text-gray-600">{member.wallet}</p>
                              {member.pdfFile && (
                                <p className="text-sm text-green-600 flex items-center">
                                  <DocumentTextIcon className="h-4 w-4 mr-1" />
                                  PDF: {member.pdfFile.name}
                                </p>
                              )}
                              {member.pdfIpfsHash && (
                                <p className="text-sm text-blue-600 font-mono">
                                  IPFS: {member.pdfIpfsHash.substring(0, 20)}...
                                </p>
                              )}
                            </div>
                            <button
                              onClick={() => removeMember(member.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 3 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Configurar Roles</h3>
                  <div className="bg-white rounded-lg border p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Agregar Nuevo Rol</h4>
                    <p className="text-gray-600 mb-4">Define roles con sus respectivas wallets</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre del Rol
                        </label>
                        <input
                          type="text"
                          value={newRole.name}
                          onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                          placeholder="Ej: Secretario, Decano"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Wallet
                        </label>
                        <input
                          type="text"
                          value={newRole.wallet}
                          onChange={(e) => setNewRole({...newRole, wallet: e.target.value})}
                          placeholder="0x..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                    <button
                      onClick={addRole}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <PlusIcon className="h-5 w-5" />
                      <span>Agregar Rol</span>
                    </button>
                  </div>

                  {/* Roles List */}
                  {roles.length > 0 && (
                    <div className="mt-6 bg-white rounded-lg border p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Roles Agregados</h4>
                      <div className="space-y-3">
                        {roles.map((role) => (
                          <div key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{role.name}</p>
                              <p className="text-sm text-gray-600">{role.wallet}</p>
                            </div>
                            <button
                              onClick={() => removeRole(role.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {currentStep === 4 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Configurar Autorizadores</h3>
                  
                  {/* Add New Authorizer */}
                  <div className="bg-white rounded-lg border p-6 mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Agregar Nuevo Autorizador</h4>
                    <p className="text-gray-600 mb-4">Asocia autorizadores a roles con niveles de autorización</p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nombre del Autorizador
                        </label>
                        <input
                          type="text"
                          value={newAuthorizer.name}
                          onChange={(e) => setNewAuthorizer({...newAuthorizer, name: e.target.value})}
                          placeholder="Nombre completo"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nivel de Autorización
                        </label>
                        <select
                          value={newAuthorizer.level}
                          onChange={(e) => setNewAuthorizer({...newAuthorizer, level: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option>Nivel 1</option>
                          <option>Nivel 2</option>
                          <option>Nivel 3</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Wallet
                        </label>
                        <input
                          type="text"
                          value={newAuthorizer.wallet}
                          onChange={(e) => setNewAuthorizer({...newAuthorizer, wallet: e.target.value})}
                          placeholder="0x..."
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rol Asociado
                        </label>
                        <select
                          value={newAuthorizer.role}
                          onChange={(e) => setNewAuthorizer({...newAuthorizer, role: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Seleccionar rol</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={addAuthorizer}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
                    >
                      <ShieldCheckIcon className="h-5 w-5" />
                      <span>Agregar Autorizador</span>
                    </button>
                  </div>

                  {/* Authorizers List */}
                  {authorizers.length > 0 && (
                    <div className="bg-white rounded-lg border p-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Autorizadores Agregados</h4>
                      <div className="space-y-3">
                        {authorizers.map((authorizer) => (
                          <div key={authorizer.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div>
                                <p className="font-medium text-gray-900">{authorizer.name}</p>
                                <p className="text-sm text-gray-600">{authorizer.wallet}</p>
                              </div>
                              <div className="flex space-x-2">
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                                  {authorizer.level}
                                </span>
                                <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-gray-200 text-gray-800">
                                  {authorizer.role}
                                </span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeAuthorizer(authorizer.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <XMarkIcon className="h-5 w-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex justify-between p-6 border-t">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg ${
                  currentStep === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
              >
                Anterior
              </button>
              <div className="flex space-x-3">
                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={createCertification}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
                  >
                    Crear Certificación
                  </button>
                )}
              </div>
            </div>
                     </div>
         </div>
       )}

       {/* Certification Details Modal */}
       {showCertificationDetails && selectedCertification && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
           <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
             {/* Modal Header */}
             <div className="flex items-center justify-between p-6 border-b">
               <div>
                 <h2 className="text-2xl font-bold text-gray-900">Detalles de Certificación</h2>
                 <p className="text-gray-600">Estado de autorizaciones pendientes</p>
               </div>
               <button
                 onClick={() => setShowCertificationDetails(false)}
                 className="text-gray-400 hover:text-gray-600"
               >
                 <XMarkIcon className="h-6 w-6" />
               </button>
             </div>

             {/* Modal Content */}
             <div className="p-6">
               {/* Certification Info */}
               <div className="bg-gray-50 rounded-lg p-6 mb-6">
                 <h3 className="text-xl font-bold text-gray-900 mb-4">{selectedCertification.title}</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div>
                     <p className="text-sm font-medium text-gray-600">Solicitante</p>
                     <p className="text-gray-900">{selectedCertification.requestedBy}</p>
                     <p className="text-sm text-gray-500 font-mono">{selectedCertification.requestedByWallet}</p>
                   </div>
                   <div>
                     <p className="text-sm font-medium text-gray-600">Fecha de Solicitud</p>
                     <p className="text-gray-900">{selectedCertification.date}</p>
                   </div>
                   <div className="md:col-span-2">
                     <p className="text-sm font-medium text-gray-600">Descripción</p>
                     <p className="text-gray-900">{selectedCertification.description}</p>
                   </div>
                 </div>
               </div>

               {/* Progress Bar */}
               <div className="mb-6">
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-medium text-gray-700">Progreso de Autorización</span>
                   <span className="text-sm text-gray-500">{selectedCertification.currentLevel} de {selectedCertification.totalLevels}</span>
                 </div>
                 <div className="w-full bg-gray-200 rounded-full h-2">
                   <div 
                     className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                     style={{ width: `${(selectedCertification.currentLevel / selectedCertification.totalLevels) * 100}%` }}
                   ></div>
                 </div>
               </div>

               {/* Authorizations Status */}
               <div>
                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Estado de Autorizaciones</h4>
                 <div className="space-y-4">
                   {selectedCertification.authorizations.map((auth: any, index: number) => (
                     <div key={index} className="border rounded-lg p-4">
                       <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                           <div className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                             auth.status === "Aprobado" 
                               ? "bg-green-100 text-green-800"
                               : auth.status === "Rechazado"
                               ? "bg-red-100 text-red-800"
                               : "bg-yellow-100 text-yellow-800"
                           }`}>
                             {auth.level}
                           </div>
                           <div>
                             <p className="font-medium text-gray-900">Nivel {auth.level} - {auth.role}</p>
                             <p className="text-sm text-gray-600">{auth.authorizer}</p>
                             <p className="text-xs text-gray-500 font-mono">{auth.wallet}</p>
                           </div>
                         </div>
                         <div className="text-right">
                           <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                             auth.status === "Aprobado" 
                               ? "bg-green-100 text-green-800"
                               : auth.status === "Rechazado"
                               ? "bg-red-100 text-red-800"
                               : "bg-yellow-100 text-yellow-800"
                           }`}>
                             {auth.status}
                           </span>
                           {auth.status === "Pendiente" && (
                             <p className="text-xs text-gray-500 mt-1">Esperando autorización</p>
                           )}
                         </div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* PDF Viewer */}
               <div className="mt-6">
                 <h4 className="text-lg font-semibold text-gray-900 mb-4">Documento de Certificación</h4>
                 <div className="bg-gray-50 rounded-lg p-4 border-2 border-dashed border-gray-300">
                   <div className="flex items-center justify-center">
                     <DocumentTextIcon className="h-12 w-12 text-gray-400" />
                   </div>
                   <p className="text-center text-gray-600 mt-2">PDF de la certificación</p>
                   <p className="text-center text-sm text-gray-500">El documento se mostrará aquí cuando esté disponible</p>
                 </div>
               </div>
             </div>

             {/* Modal Footer */}
             <div className="flex justify-end p-6 border-t">
               <button
                 onClick={() => setShowCertificationDetails(false)}
                 className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
               >
                 Cerrar
               </button>
             </div>
           </div>
         </div>
       )}
     </div>
   );
 } 