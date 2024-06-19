import { useState } from "react";
import { Button, Col } from "react-bootstrap";
import { CategoryObject } from "../../../../components/common/Models";
import { ConfirmationModal } from "../../../../components/common/ConfirmationModal";
import api from "../../../../services/Api";
import '../styles.css'

interface CategoryCardProps {
  category: CategoryObject;
  onEdit: (categoryId: string, newName: string) => void;
  onRemove: (categoryId: string) => void;
  isEditing: boolean;
  setIsEditing: (newIsEditing: boolean) => void;
}

const CategoryCard = ({ category, onEdit, onRemove, isEditing }: CategoryCardProps) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [isEditingState, setIsEditingState] = useState(isEditing);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = () => {
    setIsEditingState(true);
  };

  const handleSave = async () => {
    try {
      await api.patch(`/category/${category.id}`, { name: categoryName });
      onEdit(category.id, categoryName);
      setIsEditingState(false);
    } catch (error) {
      console.error('Erro ao salvar categoria');
    }
  };

  const handleRemove = async () => {
    try {
      await api.delete(`/category/${category.id}`);
      onRemove(category.id);
    } catch (error) {
      console.error('Erro ao remover categoria');
    }
  };

  return (
    <Col className="mb-3">
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleRemove}
        text="Deseja realmente excluir a categoria?"
      />
      <div className="card p-3 shadow">
        {isEditingState ? (
          <>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="form-control mb-2"
            />
            <Button variant="primary form-control mb-2" onClick={handleSave}>
              Salvar
            </Button>
            <Button variant="secondary form-control mb-2" onClick={() => setIsEditingState(false)}>
              Cancelar
            </Button>
          </>
        ) : (
          <>
            <h5 className="card-title">{categoryName}</h5>
            <div className="d-flex justify-content-end">
              <Button variant="warning" onClick={handleEdit}>
                Editar
              </Button>
              <Button variant="danger" onClick={() => setShowModal(true)} >
                Remover
              </Button>
            </div>
          </>
        )}
      </div>
    </Col>
  );
};

export default CategoryCard;