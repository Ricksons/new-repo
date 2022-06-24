<template>
    <div>
        <el-dropdown trigger="click" @command="params.props.actionsHandler($event, params)">
            <el-button icon="el-icon-more" type="plain" size="mini"></el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="editAction">
                    <i class="el-icon-edit-outline"></i> {{$ml.get('edit')}}
                </el-dropdown-item>
                <el-dropdown-item command="removeAction">
                    <i class="el-icon-delete"></i> {{$ml.get('remove')}}
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
