<template>
	<el-dialog v-model="visible" title="日志详情" :close-on-click-modal="false" draggable>
		<el-form label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="日志ID">
						<el-input v-model="dataForm.id" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="操作人">
						<el-input v-model="dataForm.real_name" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="请求URI">
						<el-input v-model="dataForm.req_uri" disabled></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="请求方法">
						<el-input v-model="dataForm.req_method" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="操作IP">
						<el-input v-model="dataForm.ip" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="操作类型">
						<BaseSelect v-model="dataForm.operate_type" dict-type="log_operate_type" disabled style="width: 100%"></BaseSelect>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="执行时长">
						<el-input v-model="dataForm.duration" disabled>
							<template #append>ms</template>
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="状态" prop="status">
						<el-tag v-if="dataForm.status === 0" type="danger">失败</el-tag>
						<el-tag v-else type="success">成功</el-tag>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="创建时间" prop="create_time">
						<el-input v-model="dataForm.create_time" disabled></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-form-item label="User Agent">
				<el-input v-model="dataForm.user_agent" disabled></el-input>
			</el-form-item>
			<el-form-item label="请求参数">
				<el-input v-model="dataForm.req_params" :rows="8" type="textarea" disabled />
			</el-form-item>
		</el-form>
		<template #footer>
			<el-button type="primary" @click="visible = false">关闭</el-button>
		</template>
	</el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const visible = ref(false)
const dataForm = reactive({
	id: '',
	real_name: '',
	req_uri: '',
	req_method: '',
	ip: '',
	operate_type: '',
	duration: '',
	status: 0,
	user_agent: '',
	req_params: '',
	create_time: ''
})

const init = (data?: any) => {
	visible.value = true
	Object.assign(dataForm, data)
}

defineExpose({
	init
})
</script>
