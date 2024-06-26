import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { CategoryObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import * as ROUTES from '../../../constants/routes';
import './styles.css'
import CategoryCard from './components/CategoryCard';

const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryObject[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const createCategory = () => {
    navigate(ROUTES.ADMIN_CATEGORY_ADD);
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('category');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (categoryId: string, newName: string) => {
    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.id === categoryId ? { ...cat, name: newName } : cat
      )
    );
  };

  const handleRemoveCategory = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.id !== categoryId)
    );
  };

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <div className="tertiary-container">
          <h3 className="text-center m-4">Categorias</h3>
          <div className="p-4">
            <div className="d-flex justify-content-end">
              <Button
                className="btn bg-black text-white rounded p-2 mb-4"
                onClick={createCategory}
              >
                Criar nova categoria
              </Button>
            </div>
            <div>
              {categories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onEdit={handleEditCategory}
                  onRemove={handleRemoveCategory}
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

export default Categories;