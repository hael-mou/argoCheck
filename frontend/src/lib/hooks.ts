
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "./api";

// === useCategories : =============================================================
export const useCategories = () =>
    useQuery({
      queryKey: ["categories"],
      queryFn: async () => {
            const response = await api.get("/products/categories/");
            return response.data;
        },
  });

// === useProducts : =============================================================
export const useProducts = (page = 1, search = "", category = "", rating = "") =>
  useQuery({
    queryKey: ["products", page, search, category,rating],
    queryFn: async () => {
      const res = await api.get(`/products/?page=${page}&search=${search}&category=${category}&rating=${rating}`);
      return res.data;
    },
  });

// === useProductDetails : =======================================================
export const useProductDetails = (uuid: string) =>
  useQuery({
    queryKey: ["product", uuid],
    queryFn: async () => {
        const res = await api.get(`/products/${uuid}/`);
        return res.data;
    }
  });

// === useCreateReview : =======================================================
interface ReviewPayload {
  name: string;
  rating: number;
  product: string;
  comment: string;
}

export const useCreateReview = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: ReviewPayload) => {
            const response = await api.post('/products/reviews/', data);
            return response.data;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["product"] });
        }

    })};
