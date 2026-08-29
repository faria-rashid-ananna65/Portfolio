import { useState } from "react";
import API from "../services/api";
import toast from "react-hot-toast";

export const useCrud = (url) => {
  const [loading, setLoading] = useState(false);

  const create = async (formData) => {
    try {
      setLoading(true);
      const { data } = await API.post(url, formData);
      toast.success("Created successfully");
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, formData) => {
    try {
      setLoading(true);
      const { data } = await API.put(`${url}/${id}`, formData);
      toast.success("Updated successfully");
      return data.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      await API.delete(`${url}/${id}`);
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, update, remove, loading };
};
