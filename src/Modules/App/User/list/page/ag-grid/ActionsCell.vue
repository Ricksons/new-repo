<template>
  <div>
    <el-dropdown @command="params.props.actionsHandler($event, params)" trigger="click">
      <el-button icon="el-icon-more" size="mini" type="plain"></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="setProfitRate" v-if="params.data.user_profile_id == 5">
          <i class="el-icon-sort"></i> Set Profit Rate
        </el-dropdown-item>
        <!--<el-dropdown-item command="setWorkingRates" v-if="params.data.user_profile_id == 5">
          <i class="el-icon-money"></i> Show Rates
        </el-dropdown-item>-->
        <el-dropdown-item command="viewUserTests">
          <i class="el-icon-view"></i> View Tests
        </el-dropdown-item>
        <el-dropdown-item command="editAction">
          <i class="el-icon-edit-outline"></i> Edit Profile
        </el-dropdown-item>
        <el-dropdown-item command="removeAction">
          <i class="el-icon-delete"></i> Remove
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
