<template>
  <div>
    <Table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'id'">
          <span> Organization ID </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'id'">
          <a>
            {{ record.id }}
          </a>
        </template>
        <template v-if="column.key === 'organization'">
          <a>
            {{ record.organization }}
          </a>
        </template>
        <template v-else-if="column.key === 'description'">
          <a> {{ record.description }} </a>
        </template>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { Table } from 'ant-design-vue'
import useOrganization from '../../stores/Organization'

const org = useOrganization()
console.log(org)
const columns = [
  {
    name: 'Organization ID',
    dataIndex: 'id',
    key: 'id'
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    key: 'organization'
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description'
  }
]
const data = [
  {
    id: '1',
    organization: '--',
    description: 'test'
  },
  {
    id: '2',
    organization: 'org',
    description: 'test 2'
  }
]
</script>
