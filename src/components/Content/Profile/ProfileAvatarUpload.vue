<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { supabase } from '@/utils/supabase';
  import { v4 as uuidv4 } from 'uuid';
  import { useAvatarStore } from '@/stores/useAvatarStore';
  import type { User } from '@supabase/supabase-js';
  import AppIcon from '@/components/Base/AppIcon.vue';
  import AppButton from '@/components/Base/AppButton.vue';
  
  const avatarStore = useAvatarStore();
  const user = ref<User | null>(null);
  const fileInputRef = ref<HTMLInputElement | null>(null);

  onMounted(async () => {
    const { data: { user: currentUser } } = await supabase.auth.getUser();
    user.value = currentUser;
  });

  function triggerFileInput() {
    if (!user.value) return;
    fileInputRef.value?.click();
  }

  async function onFileChange(e: Event) {
    const target = e.target as HTMLInputElement | null;
    const file = target?.files?.[0];
    
    if (!file || !user.value) return;
    
    try {
      const fileName = `${user.value.id}/${uuidv4()}.png`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
      
      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);
      
      const publicUrl = data.publicUrl;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: publicUrl })
        .eq('id', user.value.id);
      
      if (updateError) throw updateError;

      avatarStore.updateAvatarCache(user.value.id, publicUrl);
      
      alert('Avatar successfully updated!');
      
      if (target) target.value = '';
      
    } catch (error) {
      console.error('Error loading avatar:', error);
      alert('There was an error loading your avatar.');
    }
  }
</script>

<template>
  <div class="camera">
    <input 
      ref="fileInputRef"
      type="file" 
      accept="image/*"
      @change="onFileChange" 
      style="display: none;"
    />
    
    <app-button 
      @click="triggerFileInput"
      :disabled="!user"
      class="camera__button"
    >
      <app-icon 
        name="camera"
        size="20px"
        color="var(--text-primary)"
      />
    </app-button>
  </div>
</template>

<style scoped>
  .camera {
    display: inline-block;
  }
  .camera__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border: none;
    border-radius: var(--radius-full);
    background-color: rgb(71 85 105);
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: var(--shadow-lg);
  }
  .camera__button:hover {
    background-color: var(--hover-color);
    transform: translateY(-1px);
    box-shadow: var(--shadow-xl);
  }
</style>
