
function setEdit(){
   var editContainer=document.getElementById("editContainer");
   //总框
   var Oblock=document.createElement("div");
   Oblock.style.cssText="width:100%;background:#fff;overflow:hidden;border-bottom:1px solid #E0E6EA;padding-bottom:40px;";
   //问题框
   var Obuild=document.createElement("div");
   Obuild.style.cssText="width:100%;background:#fff;overflow:hidden;";
   // select下拉框
   var Oselect = document.createElement("select");
   var Ooption1 = document.createElement("option");
   var Ooption2 = document.createElement("option");
   var Ooption3 = document.createElement("option");
   Oselect.style.cssText = "float:left;width:120px;height:40px;border-radius:3px;border:1px solid #E0E6EA;font-size:14px;margin:30px 0 0 20px;background:#FCFCFC;";
   Ooption1.innerHTML = "单选题";
   Ooption2.innerHTML = "多选题";
   Ooption3.innerHTML = "问答题";
   //问题框
   var Otitle = document.createElement("div");
   Otitle.innerHTML = "问题 1";
   Otitle.style.cssText = "margin-left:240px;"
   // Otitle.cssText="float:left;"
   var Otextarea = document.createElement("textarea");
   Otextarea.style.cssText = "float:left;padding:8px;margin-top:10px;width:380px;height:80px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;margin-left:100px;"
   //上传图片按钮
   var OuploadImg = document.createElement("button");
   OuploadImg.style.cssText = "float:left;overflow:hidden;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OuploadImg.innerHTML = "上传图片";
   var OImg = document.createElement("i");
   OImg.style.cssText = "display:block;float:left;margin-left:18px;margin-right:-5px;width:16px;height:20px;background:url(./css/img/update.png) no-repeat;"
   OuploadImg.appendChild(OImg);
   //添加问题按钮
   var OaddIssue = document.createElement("button");
   OaddIssue.style.cssText = "float:left;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OaddIssue.innerHTML = "＋新增问题";
   //删除问题
   var OdelectIssue = document.createElement("div");
   OdelectIssue.style.cssText = "float:left;color: #8D8D8D;margin-top:10px;margin-left:20px;line-height:40px;"
   OdelectIssue.innerHTML = "删除此问题";
   //设置选项第一行
   var OsetOption=document.createElement("div");
   OsetOption.style.cssText="width:100%;background:#fff;overflow:hidden;margin-top:20px";
   var Op = document.createElement("p");
   Op.innerHTML = "设置选项";
   Op.style.cssText = "padding-left:240px;"
   var Oinput=document.createElement("input");
   Oinput.style.cssText = "padding:0 8px;float:left;margin:10px 0 0 240px;width:380px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
    //上传图片按钮
   var OuploadImg1 = document.createElement("button");
   OuploadImg1.style.cssText = "float:left;overflow:hidden;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OuploadImg1.innerHTML = "上传图片";
   var OImg1 = document.createElement("i");
   OImg1.style.cssText = "display:block;float:left;margin-left:18px;margin-right:-5px;width:16px;height:20px;background:url(./css/img/update.png) no-repeat;"
   OuploadImg1.appendChild(OImg1);
   //添加问题按钮
   var OaddIssue1 = document.createElement("button");
   OaddIssue1.style.cssText = "float:left;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OaddIssue1.innerHTML = "＋新增问题";
    //删除问题
   var OdelectIssue1 = document.createElement("div");
   OdelectIssue1.style.cssText = "float:left;color: #8D8D8D;margin-top:10px;margin-left:20px;line-height:40px;"
   OdelectIssue1.innerHTML = "删除此问题";
   //设置选项第二行
   var OsetOption1=document.createElement("div");
   OsetOption1.style.cssText="width:100%;background:#fff;overflow:hidden;margin-top:20px";
   //input输入框
   var Oinput1=document.createElement("input");
   Oinput1.style.cssText = "padding:0 8px;float:left;margin:10px 0 0 240px;width:380px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
    //上传图片按钮
   var OuploadImg2 = document.createElement("button");
   OuploadImg2.style.cssText = "float:left;overflow:hidden;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OuploadImg2.innerHTML = "上传图片";
   var OImg2 = document.createElement("i");
   OImg2.style.cssText = "display:block;float:left;margin-left:18px;margin-right:-5px;width:16px;height:20px;background:url(./css/img/update.png) no-repeat;"
   OuploadImg2.appendChild(OImg2);
   //添加问题按钮
   var OaddIssue2 = document.createElement("button");
   OaddIssue2.style.cssText = "float:left;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OaddIssue2.innerHTML = "＋新增问题";
    //删除问题
   var OdelectIssue2 = document.createElement("div");
   OdelectIssue2.style.cssText = "float:left;color: #8D8D8D;margin-top:10px;margin-left:20px;line-height:40px;"
   OdelectIssue2.innerHTML = "删除此问题";
   //设置选项第三行
   var OsetOption2=document.createElement("div");
   OsetOption2.style.cssText="width:100%;background:#fff;overflow:hidden;margin-top:20px";
   //input输入框
   var Oinput2=document.createElement("input");
   Oinput2.style.cssText = "padding:0 8px;float:left;margin:10px 0 0 240px;width:380px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
    //上传图片按钮
   var OuploadImg3 = document.createElement("button");
   OuploadImg3.style.cssText = "float:left;overflow:hidden;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OuploadImg3.innerHTML = "上传图片";
   var OImg3 = document.createElement("i");
   OImg3.style.cssText = "display:block;float:left;margin-left:18px;margin-right:-5px;width:16px;height:20px;background:url(./css/img/update.png) no-repeat;"
   OuploadImg3.appendChild(OImg3);
   //添加问题按钮
   var OaddIssue3 = document.createElement("button");
   OaddIssue3.style.cssText = "float:left;margin:10px 0 0 20px;width:120px;height:40px;background:#FCFCFC;border-radius:3px;border:1px solid #E0E6EA;color:#1198FF;";
   OaddIssue3.innerHTML = "＋新增问题";
    //删除问题
   var OdelectIssue3 = document.createElement("div");
   OdelectIssue3.style.cssText = "float:left;color: #8D8D8D;margin-top:10px;margin-left:20px;line-height:40px;"
   OdelectIssue3.innerHTML = "删除此问题";
	// Odiv.id="box";                            //创建div的id为box
  //  Odiv.className="Box"; //div的class为Box
  //  Oimg.src="./css/img/loading.gif"
  
   //添加下拉框
   Obuild.appendChild(Oselect); 
   Oselect.appendChild(Ooption1);  
   Oselect.appendChild(Ooption2); 
   Oselect.appendChild(Ooption3);
   Obuild.appendChild(Otitle);  
   Obuild.appendChild(Otextarea); 
   Obuild.appendChild(OuploadImg);   
   Obuild.appendChild(OaddIssue); 
   Obuild.appendChild(OdelectIssue);
   // editContainer.appendChild(Obuild); 
   Oblock.appendChild(Obuild); 
   //设置选项1
   OsetOption.appendChild(Op);
   OsetOption.appendChild(Oinput);
   OsetOption.appendChild(OuploadImg1);
   OsetOption.appendChild(OaddIssue1);
   OsetOption.appendChild(OdelectIssue1);
   // editContainer.appendChild(OsetOption);
   Oblock.appendChild(OsetOption);  

     //设置选项第二行
   OsetOption1.appendChild(Oinput1);
   OsetOption1.appendChild(OuploadImg2);
   OsetOption1.appendChild(OaddIssue2);
   OsetOption1.appendChild(OdelectIssue2);
   // editContainer.appendChild(OsetOption1);
   Oblock.appendChild(OsetOption1);
   //设置第三行
   OsetOption2.appendChild(Oinput2);
   OsetOption2.appendChild(OuploadImg3);
   OsetOption2.appendChild(OaddIssue3);
   OsetOption2.appendChild(OdelectIssue3);
   // editContainer.appendChild(OsetOption2); 
   Oblock.appendChild(OsetOption2);
   editContainer.appendChild(Oblock);
}