import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useData } from "../../context/DataContext";
import "./CommunityPrompts.css";
const CommunityPrompts = () => {
  const [prompts, setPrompts] = useState([]);

  const { backendUrl } = useData();

  const getCommunityPrompts = async () => {
    try {
      const res = await axios.get(`${backendUrl}/prompts/community`, {
        withCredentials: true,
      });
      if (res.data) {
        setPrompts(res.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error fetching prompts");
    }
  };

  useEffect(() => {
    getCommunityPrompts();
  }, []);

  const downloadPrompt = async (format) => {
    try {
      const res = await axios.post(
        `${backendUrl}/prompts/export`,
        { format },
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `prompt.${format === "json" ? "json" : "pdf"}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const downloadSinglePrompt = async (id, format) => {
    try {
      const res = await axios.post(
        `${backendUrl}/prompts/export-single`,
        { id, format },
        {
          headers: { "Content-Type": "application/json" },
          responseType: "blob",
          withCredentials: true,
        }
      );

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `prompt_${id}.${format === "json" ? "json" : "pdf"}`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error(error?.response || error);
      toast.error(error?.response?.data?.message || "Download failed");
    }
  };

  return (
    <div className="community-page">
      <div className="head">
        <h2 className="page-title ">
          <i className="ri-global-line earth-text"></i> Community Prompts
        </h2>
        <div className="btns">
          <button title="Download all" onClick={() => downloadPrompt("json")}>
            <i className="ri-download-fill"></i> JSON
          </button>
          <button title="Download all" onClick={() => downloadPrompt("pdf")}>
            <i className="ri-import-fill"></i> PDF
          </button>
        </div>
      </div>

      <div className="community-list">
        {prompts.length > 0 ? (
          prompts.map((prompt, index) => (
            <div key={index} className="community-card">
              <h3>{prompt.title}</h3>
              <p>{prompt.content}</p>

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

              <div className="download-buttons">
                <button
                  title="Download"
                  onClick={() => downloadSinglePrompt(prompt._id, "json")}
                >
                  <i className="ri-download-fill"></i> JSON
                </button>
                <button
                  title="Download"
                  onClick={() => downloadSinglePrompt(prompt._id, "pdf")}
                >
                  <i className="ri-import-fill"></i> PDF
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-results">🚫 No community prompts found</p>
        )}
      </div>
    </div>
  );
};

export default CommunityPrompts;
