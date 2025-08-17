import { useState } from "react";
import "./MyPrompts.css";
import axios from "axios";
import { useData } from "../../context/DataContext";
import { toast } from "react-toastify";
import { useEffect } from "react";

const MyPrompts = () => {
  const { backendUrl } = useData();
  const [filters, setFilters] = useState({
    category: "",
    tagMode: "",
    visibility: "",
  });
  const [prompts, setPrompts] = useState([]);

  const getPrompts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/prompts/personal`, {
        withCredentials: true,
      });
      if (res.data) {
        setPrompts(res.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };
  useEffect(() => {
    getPrompts();
  }, []);

  const filteredPrompts = prompts?.filter((prompt) => {
    return (
      (filters.category ? prompt.category === filters.category : true) &&
      (filters.tagMode ? prompt.tagMode === filters.tagMode : true) &&
      (filters.visibility ? prompt.visibility === filters.visibility : true)
    );
  });

  return (
    <div className="my-prompts">
      <div className="filter-section">
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">All Categories</option>
          <option value="Coding">Coding</option>
          <option value="Design">Design</option>
          <option value="Education">Education</option>
          <option value="Marketing">Marketing</option>
          <option value="AI Tools">AI Tools</option>
          
        </select>

        <select
          value={filters.tagMode}
          onChange={(e) => setFilters({ ...filters, tagMode: e.target.value })}
        >
          <option value="">All Tag Modes</option>
          <option value="manual">Manual</option>
          <option value="ai">AI Generated</option>
        </select>

        <select
          value={filters.visibility}
          onChange={(e) =>
            setFilters({ ...filters, visibility: e.target.value })
          }
        >
          <option value="">All Visibility</option>
          <option value="personal">Personal</option>
          <option value="community">Community</option>
        </select>
      </div>

      <div className="prompts-list">
        {filteredPrompts.length > 0 ? (
          filteredPrompts.map((prompt, index) => (
            <div key={index} className="prompt-card">
              <h3>{prompt?.title}</h3>
              <p>{prompt?.content}</p>
              <div className="data-meta">
                <div className="data">
                  <i className="ri-folders-fill folders"></i>
                  <p className="category">{prompt?.category}</p>
                </div>
                <div className="data">
                  <i className="ri-eye-fill eye"></i>
                  <p> {prompt?.visibility}</p>
                </div>
                <div className="data">
                  <i className="ri-bookmark-2-fill tags"></i>
                  <p>{prompt?.tags.join(", ")}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">No prompts found 🚫</p>
        )}
      </div>
    </div>
  );
};

export default MyPrompts;
