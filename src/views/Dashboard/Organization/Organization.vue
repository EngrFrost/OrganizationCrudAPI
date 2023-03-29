<!-- eslint-disable vue/no-unused-vars -->
<template>
  <div>
    <Button type="primary" @click="openDialog(DIALOG_CONSTANTS_VARIABLE.isForAddNewDialog)"
      >Add Organization</Button
    >
    <Row justify="end" style="margin-bottom: 1rem">
      <Col>
        <Space>
          <Button
            :disabled="organizationData?.links?.first ? false : true"
            @click="pageHandler('first')"
            ><StepBackwardOutlined
          /></Button>
          <Button
            :disabled="organizationData?.links?.prev ? false : true"
            @click="pageHandler('prev')"
            ><CaretLeftOutlined
          /></Button>
          {{ organizationData?.meta?.current_page }}
          <Button
            :disabled="organizationData?.links?.next ? false : true"
            @click="pageHandler('next')"
            ><CaretRightOutlined
          /></Button>
          <Button
            :disabled="organizationData?.links?.last ? false : true"
            @click="pageHandler('last')"
            ><StepForwardOutlined
          /></Button> </Space
      ></Col>
    </Row>

    <Table
      :columns="columns"
      :data-source="organizationData.data"
      :loading="isLoadingTable"
      :pagination="false"
    >
      <template v-slot:index="{ index }">
        <a> {{ index + 1 }} </a>
      </template>
      <template v-slot:id="{ text }">
        <a> {{ text }} </a>
      </template>
      <template v-slot:organization="{ text }">
        <a> {{ text }} </a>
      </template>
      <template v-slot:description="{ text }">
        <a> {{ text }} </a>
      </template>
      <template v-slot:operation="{ record }">
        <Space
          ><EditTwoTone
            @click="actionHandleClick(record, HANDLE_ACTION_VARIABLE.edit)"
            twoToneColor="#1890ff"
            style="font-size: 22px" />
          <DeleteTwoTone
            @click="actionHandleClick(record, HANDLE_ACTION_VARIABLE.delete)"
            twoToneColor="red"
            style="font-size: 22px"
        /></Space>
      </template>
    </Table>

    <!-- Modal for Delete Organization  -->
    <DeleteOrganization
      @closeDialog="closeDialog"
      :isOpenDialogDeleteOrganization="isOpenDialogDeleteOrganization"
      :modalID="modalID"
    />
    <!-- Modal for either add New Org or Update Organization  -->
    <AddNewOrganization
      :isOpenDialogAddUpdateOrganization="isOpenDialogAddUpdateOrganization"
      @closeDialog="closeDialog"
      :isForAddNewModal="isForAddNewModal"
      :modalID="modalID"
    />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { Table, Space, Button, Row, Col } from 'ant-design-vue'
import useOrganization from '../../../stores/Organization'
import {
  EditTwoTone,
  DeleteTwoTone,
  StepBackwardOutlined,
  StepForwardOutlined,
  CaretLeftOutlined,
  CaretRightOutlined
} from '@ant-design/icons-vue'
//const
import {
  DIALOG_CONSTANTS_VARIABLE,
  HANDLE_ACTION_VARIABLE
} from '../../../constants/constantsVarible'
//component
import AddNewOrganization from './AddnewOrganization.vue'
import DeleteOrganization from './DeleteOrganization.vue'
import { useDialog } from '../../../hooks/Organization/useDialog'

const org = useOrganization()

const { organizationData, fetching: isLoadingTable } = storeToRefs(org)

//hooks for Dialog Control
const {
  closeDialog,
  actionHandleClick,
  isForAddNewModal,
  modalID,
  isOpenDialogAddUpdateOrganization,
  isOpenDialogDeleteOrganization,
  openDialog
} = useDialog()

const columns = [
  {
    title: 'No.',
    dataIndex: 'index',
    key: 'index',
    slots: { customRender: 'index' }
  },
  {
    title: 'Organization ID',
    dataIndex: 'id',
    key: 'id',
    slots: { bodyCell: 'id' }
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    key: 'organization',
    slots: { bodyCell: 'organization' }
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    slots: { bodyCell: 'description' }
  },
  {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 100,
    slots: { customRender: 'operation' }
  }
]
//table Page Handler
const pageHandler = (type) => {
  const action = {
    next: () => {
      org.fetchOrganization(organizationData.value.links.next)
    },
    prev: () => {
      org.fetchOrganization(organizationData.value.links.prev)
    },
    first: () => {
      org.fetchOrganization(organizationData.value.links.first)
    },
    last: () => {
      org.fetchOrganization(organizationData.value.links.last)
    }
  }
  action[type]()
}

onMounted(() => {
  org.fetchOrganization('/organization')
})
</script>
