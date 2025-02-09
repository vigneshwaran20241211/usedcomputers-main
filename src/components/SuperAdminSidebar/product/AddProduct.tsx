import { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const FormElements = () => {
  const router = useRouter();
  const [accessToken, setAccessToken] = useState(null);
  const [data, setData] = useState({
    id: "",
    title: "",
    categoryId: "",
    image_url: "",
    logo_url: "",
    weight: 0,
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
      <ToastContainer />
      <Breadcrumb pageName="Product" />
      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-[10px] border bg-white shadow-1">
            <div className="border-b px-6.5 py-4">
              <h3 className="font-semibold text-dark">Add | Edit Product</h3>
              <Link href="/superadmin/product/viewproduct">
                <button type="button" className="float-right mb-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm text-white">
                  Back
                </button>
              </Link>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Product Name</label>
                  <input type="hidden" name="id" value={data.id} onChange={handleChange} />
                  <input type="text" id="title" name="title" value={data.title} onChange={handleChange} placeholder="Enter a product name" className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm" required />
                </div>

                <div className="mb-4.5">
                  <label htmlFor="categoryId" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                  <select id="categoryId" name="categoryId" value={data.categoryId} onChange={handleChange} className="block w-full px-4 py-2 border rounded-md" defaultValue="">
                    <option value="" disabled>Choose a category</option>
                    {category.map(value => (
                      <option key={value.id} value={value.id}>{value.title}</option>
                    ))}
                  </select>
                </div>

                <div className="w-full mb-4.5">
                  <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-900">Product Logo</label>
                  <input type="file" name="logo_url" onChange={handleFileChange} className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500" required={!data.id} />
                </div>

                <div className="w-full mb-4.5">
                  <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-900">Product Image</label>
                  <input type="file" name="image_url" className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"/>
                </div>
                <div className="mb-4.5">
                  <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Product Weight</label>
                  <input type="number" id="weight" name="weight" value={data.weight} onChange={handleChange} placeholder="Enter a product weight" className="block w-full rounded-lg border bg-gray-50 p-2.5 text-sm" required />
                </div>
                
                <div className="mb-4.5">
                  <label
                    htmlFor="dynamicInputs"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Parts and Values
                  </label>
                  {partsInputs.map((input, index) => (
                    <div key={index} className="flex items-center gap-4 mb-4">
                      <select
                        className="block w-full px-4 py-2 text-gray-700 border rounded-md"
                        value={input.id}
                        onChange={(e) =>
                          handleDynamicChange(index, "id", e.target.value)
                        }
                      >
                        <option value="">Choose a Part</option>
                        {parts.map((part) => (
                          <option key={part._id} value={part._id}>
                            {part.title}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="block w-full p-2.5 border rounded-lg"
                        placeholder="Enter value"
                        value={input.quantity}
                        onChange={(e) =>
                          handleDynamicChange(index, "quantity", e.target.value)
                        }
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddInput}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Add More
                  </button>
                </div>

                <button type="submit" className="flex w-full justify-center rounded-[7px] bg-primary p-[13px] text-white">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormElements;
