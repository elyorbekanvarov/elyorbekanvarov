import api from "../axios";
export interface Contact {
  id?: number;
  name: string;
  email: string;
  subject?: string;
  message: string;
  created_at?: string;
}

export const ContactService = {
  getContacts: async (): Promise<Contact[]> => {
    const { data } = await api.get("contact/");
    return data.results || data;
  },

  getContactById: async (id: number): Promise<Contact> => {
    const { data } = await api.get(`contact/${id}/`);
    return data;
  },

  sendContact: async (payload: Partial<Contact>) => {
    const dataToSend = {
      name: payload.name,
      email: payload.email,
      subject: payload.subject || "Portfolio Contact",
      message: payload.message,
    };
    const { data } = await api.post("contact/", dataToSend);
    return data;
  },

  deleteContact: async (id: number) => {
    await api.delete(`contact/${id}/`);
  },
};
