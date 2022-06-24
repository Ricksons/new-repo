<template>
    <el-container style="background-color: rgb(48, 51, 51)" class="m-0 p-0">
        <el-footer class="p-0 m-0" style="height: auto">
            <el-row class="text-white p-5 m-0" :gutter="20">
                <el-col :xs="24" :md="6">
                    <t-header>اشترك في نشرتنا الإخبارية</t-header>
                        <text-field class="mb-0" :controller="controller" :label_span="24" :field_span="19"  field_mark="false"
                        :placeholder="$ml.get('enter_your_email_address_here')" rules="required" name="father_name"
                        :label='false' :prepend="true">
                        </text-field>

                        <b-primary > <i class="el-icon-position"></i> Subscribe</b-primary>

                        <div class="mt-5">
                            <tag-social-media href="http://www.google.com" type="facebook"></tag-social-media>
                            <tag-social-media href="www.google.com" type="twitter"></tag-social-media>
                            <tag-social-media href="www.google.com" type="linkedin"></tag-social-media>
                            <tag-social-media href="www.google.com" type="instagram"></tag-social-media>
                            <tag-social-media href="www.google.com" type="youtube"></tag-social-media>
                        </div>

                </el-col>
                <el-col :xs="24" :md="6">
                    <t-text>
                        <t-header>روابط ذو صلة</t-header>

                        <t-icon class="mt-3" icon="el-icon-minus" :text="$ml.get('contact_us')"></t-icon>
                        <t-icon class="mt-3" icon="el-icon-minus" :text="$ml.get('apa_articles')"></t-icon>

                        <t-icon class="mt-3" icon="el-icon-minus" :text="$ml.get('members')"></t-icon>
                        <t-icon class="mt-3" icon="el-icon-minus" :text="$ml.get('about_apa')"></t-icon>

                        <t-icon class="mt-3" icon="el-icon-minus" :text="$ml.get('apa_activities')"></t-icon>
                        <t-icon class="mt-3" icon="el-icon-minus" :text="$ml.get('members_articles')"></t-icon>

                    </t-text>
                </el-col>
                <el-col :xs="24" :md="6">
                    <t-text>
                        <t-header>تواصل معنا</t-header>
                        <t-icon class="mt-3" icon="el-icon-date" text=" الاثنين - الجمعة 9:00 - 4:00 "></t-icon>
                        <t-icon class="mt-3" icon="el-icon-location" text=" بيروت ، معوض"></t-icon>
                        <t-icon class="mt-3" icon="el-icon-phone" text="666 798 71 961+ "></t-icon>
                    </t-text>
                </el-col>
                <el-col :xs="24" :md="6" class="pr-4">
                    <t-text>
                    <img src="https://apa-inter.com/resources/apa-logo-org-small.png" width="128px">
                        <div>
                            الرابطة الدولیة للخبراء والمحللین السیاسیین، هي منظمة دولیة مستقلة غیر حكومیة، مقرها الرئيس في بيروت، ولها ممثليات في العديد من الدول .
                        </div>
                    </t-text>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" style="background-color: #202222">
                    <t-text class="text-center text-white p-3">
                        جميع الحقوق محفوظة للرابطة الدولية للخبراء والمحللين السياسيين (C) {{currentYear}}
                    </t-text>
                </el-col>
            </el-row>
        </el-footer>
    </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      currentYear: (() => {
        return (new Date()).getFullYear();
      })(),
      controller: this
    };
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log('Header NAV', key, keyPath);
    }
  }
}
</script>

<style lang="scss" scoped>
    .el-menu-item {
        text-align: right !important;
    }

    .esb-header {
        .el-menu-item.is-active {
            color: #fff !important;
            background-color: #00d0d4 !important
        }

        .el-menu-item, .el-submenu {
            float: right !important;
        }
    }

   .el-menu.el-menu--horizontal {
       border-bottom: none !important;
   }
</style>
