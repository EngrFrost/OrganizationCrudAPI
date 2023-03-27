<template>
  <Layout class="layout">
    <Sidebar :collapsed="collapsed" />
    <Layout>
      <Layout.Header style="background: #fff; padding: 0">
        <MenuUnfoldOutlined
          v-if="collapsed"
          class="trigger"
          @click="() => (collapsed = !collapsed)"
        />
        <MenuFoldOutlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
      </Layout.Header>
      <Layout.Content
        :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
      >
        <router-view></router-view>
      </Layout.Content>
    </Layout>
  </Layout>
</template>

<script setup>
// eslint-disable-next-line no-unused-vars

import { Layout } from 'ant-design-vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { ref, watch } from 'vue'
import Sidebar from '../components/Layout/Sidebar.vue'

const collapsed = ref(false)

watch(collapsed, () => {
  console.log(collapsed)
})
</script>

<style>
@media (min-width: 1024px) {
  .layout {
    min-height: 100vh;
  }
}
</style>
