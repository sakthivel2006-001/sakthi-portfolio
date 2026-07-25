import { supabase } from '../lib/supabase';

class ApiService {
  // Projects
  async getProjects() {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error: error.message };
    }
  }

  async getProject(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching project:', error);
      return { success: false, error: error.message };
    }
  }

  async createProject(projectData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('projects')
        .insert([projectData])
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }
  }

  async updateProject(id, projectData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('projects')
        .update(projectData)
        .eq('id', id)
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating project:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteProject(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }
  }

  // Certificates
  async getCertificates() {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('issue_date', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching certificates:', error);
      return { success: false, error: error.message };
    }
  }

  async createCertificate(certificateData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('certificates')
        .insert([certificateData])
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating certificate:', error);
      return { success: false, error: error.message };
    }
  }

  // Contact Messages
  async sendContactMessage(messageData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([messageData])
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error sending message:', error);
      return { success: false, error: error.message };
    }
  }

  async getContactMessages() {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      return { success: false, error: error.message };
    }
  }

  // Comments
  async getComments() {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching comments:', error);
      return { success: false, error: error.message };
    }
  }

  async createComment(commentData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('comments')
        .insert([commentData])
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating comment:', error);
      return { success: false, error: error.message };
    }
  }

  async approveComment(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('comments')
        .update({ approved: true })
        .eq('id', id)
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error approving comment:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteComment(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting comment:', error);
      return { success: false, error: error.message };
    }
  }

  // Gallery
  async getGallery() {
    try {
      if (!supabase) return [];
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('date', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return { success: false, error: error.message };
    }
  }

  async createGalleryItem(itemData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const payload = {
        title: itemData.title,
        description: itemData.description,
        media_url: itemData.media_url,
        media_urls: itemData.media_urls,
        type: itemData.type,
        date: itemData.date,
      };
      const { data, error } = await supabase
        .from('gallery')
        .insert([payload])
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error creating gallery item:', error);
      return { success: false, error: error.message };
    }
  }

  async updateGalleryItem(id, itemData) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const payload = {
        title: itemData.title,
        description: itemData.description,
        media_url: itemData.media_url,
        media_urls: itemData.media_urls,
        type: itemData.type,
        date: itemData.date,
      };
      const { data, error } = await supabase
        .from('gallery')
        .update(payload)
        .eq('id', id)
        .select();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error updating gallery item:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteGalleryItem(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error deleting gallery item:', error);
      return { success: false, error: error.message };
    }
  }

  // Gallery Interactions
  async likeGalleryItem(id) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { error } = await supabase.rpc('increment_gallery_likes', { row_id: id });
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error('Error liking gallery item:', error);
      return { success: false, error: error.message };
    }
  }

  async getGalleryComments(galleryId) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('gallery_comments')
        .select('*')
        .eq('gallery_id', galleryId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching gallery comments:', error);
      return { success: false, error: error.message };
    }
  }

  async postGalleryComment(galleryId, name, content) {
    try {
      if (!supabase) throw new Error('Supabase client not initialized');
      const { data, error } = await supabase
        .from('gallery_comments')
        .insert([{ gallery_id: galleryId, name, content }])
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    } catch (error) {
      console.error('Error posting gallery comment:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new ApiService();
