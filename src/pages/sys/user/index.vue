<template>
  <el-card>
    <el-form :inline="true" :model="state.queryForm" @keyup.enter="getDataList()">
      <el-form-item>
        <el-input v-model="state.queryForm.username" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="state.queryForm.mobile" placeholder="手机号" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <BaseSelect v-model="state.queryForm.gender" dict-type="user_gender" clearable placeholder="性别"></BaseSelect>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-auth="'sys:user:save'" type="primary" @click="addOrUpdateHandle()">新增</el-button>
      </el-form-item>
      <el-form-item>
        <el-button v-auth="'sys:user:delete'" type="danger" @click="deleteBatchHandle()">删除</el-button>
      </el-form-item>
      <el-form-item v-auth="'sys:user:import'">
        <el-upload
            :action="BASE_UPLOAD_USER_EXCEL_URL"
            :headers="headers"
            :before-upload="beforeUpload"
            :on-success="handleSuccess"
            :show-file-list="false"
        >
          <el-button type="info">导入</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button v-auth="'sys:user:export'" type="success" @click="downloadExcel()">导出</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="state.dataListLoading" :data="state.dataList" border style="width: 100%"
              @selection-change="selectionChangeHandle">
      <el-table-column type="selection" header-align="center" align="center" width="50"></el-table-column>
      <el-table-column prop="username" label="用户名" header-align="center" align="center"></el-table-column>
      <el-table-column prop="real_name" label="姓名" header-align="center" align="center"></el-table-column>
      <BaseTableColumn prop="gender" label="性别" dict-type="user_gender"></BaseTableColumn>
      <el-table-column prop="mobile" label="手机号" header-align="center" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" header-align="center" align="center"></el-table-column>
      <BaseTableColumn prop="status" label="状态" dict-type="user_status"></BaseTableColumn>
      <el-table-column prop="create_time" label="创建时间" header-align="center" align="center"
                       width="180"></el-table-column>
      <el-table-column label="操作" fixed="right" header-align="center" align="center" width="150">
        <template #default="scope">
          <el-button v-auth="'sys:user:update'" type="primary" link @click="addOrUpdateHandle(scope.row.id)">修改
          </el-button>
          <el-button v-auth="'sys:user:delete'" type="primary" link @click="deleteBatchHandle(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        :current-page="state.page"
        :page-sizes="state.pageSizes"
        :page-size="state.limit"
        :total="state.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="sizeChangeHandle"
        @current-change="currentChangeHandle"
    >
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update ref="addOrUpdateRef" @refresh-data-list="getDataList"></add-or-update>
  </el-card>
</template>

<script setup name="SysUser">
import useCrud from '@/hooks/useCrud'
import {reactive, ref} from 'vue'
import AddOrUpdate from './add-or-update.vue'

import {ElMessage} from 'element-plus'
import useUserStore from '@/store/modules/userStore'
import useDownload from '@/hooks/useDownload'
import {BASE_UPLOAD_USER_EXCEL_URL} from "@/constants";

const userStore = useUserStore()
const headers = ref({
  Authorization: userStore.token
})



const {state, getDataList, selectionChangeHandle, sizeChangeHandle, currentChangeHandle, deleteBatchHandle} = useCrud({
  baseUrl: '/sys/user',
  queryForm: {
    username: '',
    mobile: '',
    gender: ''
  }
})

const addOrUpdateRef = ref()
const addOrUpdateHandle = id => {
  addOrUpdateRef.value.init(id)
}

const downloadExcel = () => {
  useDownload({url: '/sys/user/export', method: 'GET'})()
}

const handleSuccess = (res, file) => {
  if (res.code !== 0) {
    ElMessage.error('上传失败：' + res.msg)
    return false
  }

  ElMessage.success({
    message: '上传成功',
    duration: 500,
    onClose: () => {
      getDataList()
    }
  })
}

const beforeUpload = file => {
  if (file.size / 1024 / 1024 / 1024 / 1024 > 1) {
    ElMessage.error('文件大小不能超过100M')
    return false
  }
  return true
}
</script>
