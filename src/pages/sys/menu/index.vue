<template>
  <el-card class="mod__menu">
    <el-form :inline="true">
      <el-form-item>
        <el-button v-auth="'sys:menu:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
        ref="elMenuTable"
        @row-click="onRowClick"
        v-loading="state.dataListLoading"
        :data="state.dataList"
        row-key="id"
        border
        style="width: 100%"
    >
      <el-table-column prop="name" label="名称" header-align="center" min-width="150"></el-table-column>
      <el-table-column prop="icon" label="图标" header-align="center" align="center">
        <template #default="scope">
          <BaseSvgIcon :icon="scope.row.icon"></BaseSvgIcon>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="类型" header-align="center" align="center">
        <template #default="scope">
          <el-tag v-if="scope.row.type === 0" type="info">菜单</el-tag>
          <el-tag v-if="scope.row.type === 1" type="success">按钮</el-tag>
          <el-tag v-if="scope.row.type === 2" type="warning">接口</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="open_style" label="打开方式" header-align="center" align="center">
        <template #default="scope">
          <span v-if="scope.row.type !== 0"></span>
          <el-tag v-else-if="scope.row.open_style === 0">内部打开</el-tag>
          <el-tag v-else type="info">外部打开</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="sort" label="排序" header-align="center" align="center"></el-table-column>
      <el-table-column prop="url" label="路由" header-align="center" align="center" width="150"
                       :show-overflow-tooltip="true"></el-table-column>
      <el-table-column
          prop="authority"
          label="授权标识"
          header-align="center"
          align="center"
          width="150"
          :show-overflow-tooltip="true"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
        <template #default="scope">
          <el-button v-auth="'sys:menu:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-auth="'sys:menu:delete'" type="primary" link @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
  </el-card>
</template>

<script setup name="SysMenu">
import useCrud from '@/hooks/useCrud'
import {ref} from 'vue'
import AddOrUpdate from './add-or-update.vue'
import {ElTable} from 'element-plus'



const {state, getDataList, deleteHandle} = useCrud({
  baseUrl: '/sys/menu',
  isPage: false
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = (id) => {
  addOrUpdateRef.value.init(id)
}

const elMenuTable = ref()
const onRowClick = (row) => {
  elMenuTable.value.toggleRowExpansion(row, undefined)
}
</script>
