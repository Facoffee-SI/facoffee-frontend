import { useState, useEffect } from "react";
import { Button, Col } from "react-bootstrap";
import { PermissionObject, RolesResponse } from "../../../../components/common/Models";
import { ConfirmationModal } from "../../../../components/common/ConfirmationModal";
import api from "../../../../services/Api";
import '../styles.css'

interface RoleCardProps {
  role: RolesResponse;
  onEdit: (roleId: string, newName: string, permissionIds: number[]) => void;
  onRemove: (roleId: string) => void;
  isEditing: boolean;
  setIsEditing: (newIsEditing: boolean) => void;
}

type TranslationKeys = 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'user' | 'category' | 'role' | 'permission' | 'product' | 'contact' | 'plan' | 'about' | 'report';

type TranslationMap = {
  [key in TranslationKeys]: string;
};

const translationMap: TranslationMap = {
  POST: "Enviar",
  GET: "Buscar",
  PATCH: "Modificar",
  DELETE: "Apagar",
  user: "usuário",
  category: "categoria",
  role: "cargo",
  permission: "permissão",
  product: "produto",
  contact: "contato",
  plan: "plano",
  about: "sobre",
  report: "relatório",
};


const translateData = (dados: any[]) => {
  return dados.map((item) => ({
    ...item,
    action: translationMap[item.action as TranslationKeys],
    tableName: translationMap[item.tableName as TranslationKeys]
  }));
};

const RoleCard = ({ role, onEdit, onRemove, isEditing }: RoleCardProps) => {
  const [roleName, setRoleName] = useState(role.role.name);
  const [isEditingState, setIsEditingState] = useState(isEditing);
  const [showModal, setShowModal] = useState(false);
  const [permissions, setPermissions] = useState<PermissionObject[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<number[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await api.get('/permission');
        const translatedPermissions = translateData(response.data);
        setPermissions(translatedPermissions);
      } catch (error) {
        console.error('Erro ao buscar permissões.');
      }
    };

    fetchPermissions();
  }, []);

  useEffect(() => {
    if (isEditingState) {
      setSelectedPermissions(role.rolePermissions.map((permission) => permission.permissionId));
    } else {
      setSelectedPermissions([]);
    }
  }, [isEditingState, role.rolePermissions]);

  const handleEdit = () => {
    setIsEditingState(true);
  };

  const handleSave = async () => {
    try {
      const rolePayload = {
        name: roleName,
        permissionIds: selectedPermissions
      };
      await api.patch(`/role/${role.role.id}`, rolePayload);
      onEdit(role.role.id, roleName, selectedPermissions); 
      setIsEditingState(false);
    } catch (error) {
      console.error('Erro ao salvar cargo.');
    }
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/role/${role.role.id}`);
      onRemove(role.role.id);
    } catch (error) {
      console.error('Erro ao remover cargo.');
    }
  };

  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const permissionId = parseInt(event.target.value, 10);
    if (event.target.checked) {
      setSelectedPermissions([...selectedPermissions, permissionId]);
    } else {
      setSelectedPermissions(selectedPermissions.filter((id) => id !== permissionId));
    }
  };

  return (
    <Col className="mb-3">
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRemove}
        text="Deseja realmente excluir o cargo?"
      />
      <div className="card p-3 shadow">
        {isEditingState ? (
          <>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              className="form-control mb-2"
            />
            <div className="mb-2">
              <h6>Permissões:</h6>
              {permissions.map((permission) => (
                <div key={permission.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={permission.id.toString()}
                    id={`permission-${permission.id}`}
                    onChange={handlePermissionChange}
                    checked={selectedPermissions.includes(permission.id)}
                  />
                  <label className="form-check-label" htmlFor={`permission-${permission.id}`}>
                    {permission.action} - {permission.tableName}
                  </label>
                </div>
              ))}
            </div>
            <Button variant="primary form-control mb-2" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary form-control mb-2" onClick={() => setIsEditingState(false)}>
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <h5 className="card-title">{roleName}</h5>
            <div className="d-flex justify-content-end">
              <Button variant="warning" onClick={handleEdit}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => setShowModal(true)}>
                Remover
              </Button>
            </div>
          </>
        )}
      </div>
    </Col>
  );
};

export default RoleCard;
