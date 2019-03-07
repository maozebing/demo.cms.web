import {get, post, put, del} from '../http'
//获取所有情报板类型数据
export const api_listCmsSizeType = p => get('/cms/type/size', p);


//获取情报板常用库模板数据
export const api_getCmsTemplatesByCondition = p => get('/cmstemplate/condition', p);
//新增情报板常用库模板
export const api_saveCmsTemplate = p => post('/cms/template', p);
//更新情报板常用库模板
export const api_updateCmsTemplate = p => put('/cmstemplate/update', p);
//删除情报板常用库模板
export const api_deleteCmsTemplate = (path, p) => del('/cmstemplate/delete/' + path, p);

//获取所有情报板发送历史分页数据
export const api_getCmsSendPagination = p => get('/cmssend/list/pagination', p);

//获取所有情报板数据
export const api_listCms = p => get('/cms', p);
//根据编号获取情报板数据
export const api_getCms = (path, p) => get('/cms/' + path, p);

//获取情报板最新数据
export const api_getCmsSendNewRecored = p => get('/cmssend/newrecored', p);
//发送数据
export const api_cmsSend = p => post('/cmssend/send', p);


//获取情报板常用库模板类型数据
export const api_listCmsTemplateType = p => get('/cms/type/template', p);

//获取情报板常用库模板类型数据
export const api_getCmsTemplateTypesByCondition = p => get('/cmstemplatetype/condition', p);
//新增情报板常用库模板类型
export const api_addCmsTemplateType = p => post('/cmstemplatetype/add', p);
//更新情报板常用库模板类型
export const api_updateCmsTemplateType = p => put('/cmstemplatetype/update', p);
//删除情报板常用库模板类型
export const api_delateCmsTemplateType = (path, p) => del('/cmstemplatetype/delete/' + path, p);
