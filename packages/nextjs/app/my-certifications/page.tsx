"use client";

import { useState } from "react";
import { 
  DocumentTextIcon,
  EyeIcon,
  XMarkIcon,
  UserIcon,
  CalendarIcon,
  CheckCircleIcon,
  AcademicCapIcon
} from "@heroicons/react/24/outline";

interface CertificationNFT {
  id: string;
  title: string;
  description: string;
  issuedDate: string;
  issuer: string;
  issuerWallet: string;
  nftTokenId: string;
  nftContractAddress: string;
  blockchain: string;
  imageUrl?: string;
  metadata: {
    level: string;
    category: string;
    skills: string[];
    validUntil?: string;
  };
}

export default function MyCertificationsPage() {
  const [userWallet] = useState("0x1234567890123456789012345678901234567890");
  const [userRole] = useState("Admin Principal");
  
  // Mock data - in real app this would come from blockchain
  const [certificationNFTs, setCertificationNFTs] = useState<CertificationNFT[]>([
    {
      id: "1",
      title: "Certificación en Desarrollo Web",
      description: "Certificación completa en tecnologías web modernas incluyendo HTML, CSS, JavaScript, React y Node.js",
      issuedDate: "15/1/2024",
      issuer: "Universidad Tecnológica",
      issuerWallet: "0xabcd...1234",
      nftTokenId: "12345",
      nftContractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      blockchain: "Ethereum Sepolia",
      imageUrl: "/sample-certification.png",
      metadata: {
        level: "Avanzado",
        category: "Desarrollo Web",
        skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
      }
    },
    {
      id: "2",
      title: "Certificación en Blockchain",
      description: "Certificación en desarrollo de smart contracts y aplicaciones descentralizadas",
      issuedDate: "20/1/2024",
      issuer: "Instituto Blockchain",
      issuerWallet: "0xefgh...5678",
      nftTokenId: "12346",
      nftContractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      blockchain: "Ethereum Sepolia",
      metadata: {
        level: "Intermedio",
        category: "Blockchain",
        skills: ["Solidity", "Smart Contracts", "Web3.js", "DeFi"]
      }
    }
  ]);

  const [selectedNFT, setSelectedNFT] = useState<CertificationNFT | null>(null);
  const [showNFTModal, setShowNFTModal] = useState(false);

  const viewNFT = (nft: CertificationNFT) => {
    setSelectedNFT(nft);
    setShowNFTModal(true);
  };

  const closeModal = () => {
    setShowNFTModal(false);
    setSelectedNFT(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      {/* Main Content */}
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi Panel de Certificaciones</h1>
            <p className="text-gray-600">
              Bienvenido, {userRole}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <DocumentTextIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">NFTs Obtenidos</p>
                  <p className="text-2xl font-bold text-blue-600">{certificationNFTs.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Certificaciones Aprobadas</p>
                  <p className="text-2xl font-bold text-green-600">{certificationNFTs.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CalendarIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Este Mes</p>
                  <p className="text-2xl font-bold text-orange-600">{certificationNFTs.filter(nft => {
                    const issuedDate = new Date(nft.issuedDate.split('/').reverse().join('-'));
                    const now = new Date();
                    return issuedDate.getMonth() === now.getMonth() && issuedDate.getFullYear() === now.getFullYear();
                  }).length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* NFTs Section */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Mis NFTs de Certificación</h2>
              <p className="text-gray-600">Certificaciones que han sido aprobadas y convertidas en NFTs</p>
            </div>
            
            <div className="p-6">
              {certificationNFTs.length === 0 ? (
                <div className="text-center py-12">
                  <DocumentTextIcon className="mx-auto h-16 w-16 text-gray-400" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">No tienes NFTs aún</h3>
                  <p className="mt-2 text-gray-600">Cuando tus certificaciones sean aprobadas, aparecerán aquí como NFTs</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificationNFTs.map((nft) => (
                    <div key={nft.id} className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                             {/* NFT Image - Removed */}
                      
                      {/* NFT Content */}
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">{nft.title}</h3>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{nft.description}</p>
                        
                        {/* Metadata */}
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center text-xs text-gray-500">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            <span>Emitido: {nft.issuedDate}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <UserIcon className="h-3 w-3 mr-1" />
                            <span>{nft.issuer}</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <CheckCircleIcon className="h-3 w-3 mr-1" />
                            <span>Nivel: {nft.metadata.level}</span>
                          </div>
                        </div>

                                                 {/* Skills - Removed */}

                        {/* Action Button */}
                        <button
                          onClick={() => viewNFT(nft)}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2 transition-colors"
                        >
                          <EyeIcon className="h-4 w-4" />
                          <span>Ver NFT</span>
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

      {/* NFT Details Modal */}
      {showNFTModal && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{selectedNFT.title}</h2>
                <p className="text-gray-600">Detalles completos del NFT de certificación</p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* NFT Image */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">NFT Visual</h3>
                  <div className="h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    {selectedNFT.imageUrl ? (
                      <img 
                        src={selectedNFT.imageUrl} 
                        alt={selectedNFT.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <DocumentTextIcon className="h-20 w-20 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* NFT Details */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Información del NFT</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Descripción</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedNFT.description}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Token ID</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedNFT.nftTokenId}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Contrato NFT</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedNFT.nftContractAddress}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Blockchain</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedNFT.blockchain}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certification Details */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalles de la Certificación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Institución Emisora</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedNFT.issuer}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Wallet de la Institución</label>
                      <p className="mt-1 text-sm text-gray-900 font-mono">{selectedNFT.issuerWallet}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Fecha de Emisión</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedNFT.issuedDate}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nivel</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedNFT.metadata.level}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Categoría</label>
                      <p className="mt-1 text-sm text-gray-900">{selectedNFT.metadata.category}</p>
                    </div>
                    {selectedNFT.metadata.validUntil && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Válido Hasta</label>
                        <p className="mt-1 text-sm text-gray-900">{selectedNFT.metadata.validUntil}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Habilidades Certificadas</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedNFT.metadata.skills.map((skill, index) => (
                    <span 
                      key={index}
                      className="inline-flex px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end space-x-3 p-6 border-t">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
              >
                Cerrar
              </button>
              <button
                onClick={() => {
                  // Here you would typically open the NFT on a blockchain explorer
                  window.open(`https://sepolia.etherscan.io/token/${selectedNFT.nftContractAddress}?a=${selectedNFT.nftTokenId}`, '_blank');
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Ver en Blockchain
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 