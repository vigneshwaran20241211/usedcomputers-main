import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Newrequest from "@/components/FacilityCenter/collection/NewRequest";

const FormElements = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState({
    id: "",
    title: "",
    categoryId: "",
    image_url: "",
    logo_url: "",
    parts: [],
  });
  const [partsInputs, setPartsInputs] = useState([{ id: "", quantity: "" }]);
  const [category, setCategory] = useState([]);
  const [parts, setParts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  console.log(data);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAccessToken(token);
    } else {
      toast.error("Access token missing, please log in.");
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    if (accessToken) {
      axios.get(`${process.env.API_URL}category/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then(result => setCategory(result.data.data))
        .catch(error => console.error(error));

      axios.get(`${process.env.API_URL}parts/all`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).then(result => setParts(result.data.data))
        .catch(error => console.error(error));
    }
  }, [accessToken]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleDynamicChange = (index, field, value) => {
    const updatedInputs = [...partsInputs];
    updatedInputs[index][field] = value;
    setPartsInputs(updatedInputs);
  };

  const handleAddInput = () => {
    setPartsInputs([...partsInputs, { id: "", quantity: "" }]);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = data.logo_url;
      const productData = { ...data, parts: partsInputs };

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await axios.post(`${process.env.API_URL}upload`,formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
            folder: "products",
          },
        });

        imageUrl = uploadResponse.data.url;
        console.log(imageUrl);
      }
      if (data.id) {
        await axios.put(`${process.env.API_URL}product/${data.id}`, { ...productData }, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        });
        toast.success("Product Updated Successfully 🎉");
      } else {
        await axios.post(`${process.env.API_URL}product`, { ...productData,logo_url: imageUrl }, {
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        });
        toast.success("Product Created Successfully 🎉");
      }

      router.push("/superadmin/product/viewproduct");
    } catch (error) {
      setError(error.response?.data?.message || "An unknown error occurred");
      toast.error(error.response?.data?.message || "Error occurred.");
    }
  };

  return (
    <>
    <Newrequest/>
    </>
  );
};

export default FormElements;
