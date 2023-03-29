<template>
  <Layout class="layout">
    <Sidebar :collapsed="collapsed" />
    <Layout>
      <Layout.Header class="layout-header">
        <MenuUnfoldOutlined
          class="large-icon trigger"
          v-if="collapsed"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined
          v-else
          class="large-icon trigger"
          @click="() => (collapsed = !collapsed)"
        />
      </Layout.Header>
      <Layout.Content class="layout-content">
        <router-view></router-view>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Layout } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
//component
import Sidebar from '../../components/Layout/Sidebar.vue'

const collapsed = ref(false)

watch(collapsed, () => {
  console.log(collapsed)
})
</script>

<style>
.layout-content {
  margin: '24px 16px';
  padding: '24px';
  background: '#fff';
  min-height: '280px';
  margin: 1rem;
}
.layout-header {
  background: #fff;
  padding: 1rem;
}
.large-icon {
  font-size: 24px; /* or any other desired size */
}
@media (min-width: 1024px) {
  .layout {
    min-height: 100vh;
  }
}
</style>
