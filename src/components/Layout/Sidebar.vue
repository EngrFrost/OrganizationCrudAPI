<!-- eslint-disable vue/no-parsing-error -->
<!-- eslint-disable no-unused-vars -->
<template>
  <Layout.Sider v-model:collapsed="collapsed" collapsedWidth="150" :trigger="null" collapsible>
    <div class="header-sider">My App</div>
    <Menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
      <Menu.Item key="1">
        <UserOutlined />
        <RouterLink class="link" :to="'/organization'">Quiz</RouterLink>
      </Menu.Item>
      <Menu.Item key="2">
        <UserOutlined />
        <span>test</span>
      </Menu.Item>
    </Menu>
  </Layout.Sider>
</template>

<script setup>
import { watch, defineProps, toRefs, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Layout, Menu } from 'ant-design-vue'
import { UserOutlined } from '@ant-design/icons-vue'

//props
const props = defineProps(['collapsed'])

//states
const { collapsed } = toRefs(props)
const selectedKeys = ref(['1'])

// useEffects
watch(selectedKeys, (watch) => {
  selectedKeys.value = watch
})
</script>

<style>
.header-sider {
  color: white;
  font-size: 2rem;
  text-align: center;
}
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}

.ant-menu-item-selected a:hover,
.activeclasscustom {
  color: #1890ff !important ;
}
.ant-menu-item-selected a {
  color: white;
}
.link {
  color: white !important;
}
.RouterLink-active.RouterLink-exact-active.link:hover {
  color: white !important;
}
</style>
