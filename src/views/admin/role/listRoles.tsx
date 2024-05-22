import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { RolesResponse } from '../../../components/common/Models';
import api from '../../../services/Api';
import * as ROUTES from '../../../constants/routes';
import './styles.css'
import RoleCard from './RoleCard';

const Roles = () => {
  const navigate = useNavigate();
  const [roles, setRoles] = useState<RolesResponse[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const createRole = () => {
    navigate(ROUTES.ADMIN_ROLES);
  };

  const fetchRoles = async () => {
    try {
      const response = await api.get('role');
      setRoles(response.data);
    } catch (error) {
      console.error('Error fetching roles');
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRemoveRole = (roleId: string) => {
    setRoles((prevRoles) =>
      prevRoles.filter((role) => role.role.id !== roleId)
    );
  };

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <div className="tertiary-container">
          <h3 className="text-center m-4">Cargos</h3>
          <div className="p-4">
            <div className="d-flex justify-content-end">
              <Button
                className="btn bg-black text-white rounded p-2 mb-4"
                onClick={createRole}
              >
                Criar novo cargo
              </Button>
            </div>
            <div className="role-list-container">
              {roles.map((role) => (
                <RoleCard
                  key={role.role.id}
                  role={role}
                  onEdit={() => fetchRoles()}
                  onRemove={handleRemoveRole}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Roles;