$(document).ready(function() {
  $("#hw_groups").load("/hw_groups")
  $("#unass_resources").load("/unass_resources")
  $("#add_resources").load("/add_resources")
});

function reloadElements(){
      //alert("reloading")
      $("#add_resources").load("/add_resources")
      $("#unass_resources").load("/unass_resources")
      $("#hw_groups").load("/hw_groups")
      $("body").spin(false)
}

// function reloadElement(element){
//       //alert("reloading")
//       id = "#" + element
//       url =  "/" + element
//       $(id).spin()
//       $(id).load(url, function(data){
//         $(id).spin(false)
//       });
// }

$(document).on("click", "button", function(){
  instr = $(this).attr('id').replace(/_/g , '/')
  //$("body").spin()
  instr_split = instr.split("/")

  op = instr_split[0]
  mod = instr_split[1]
  id = instr_split[2]

  switch (op){
    case "ed":
      $(".hwg_val_" + id ).hide()
      $(this).hide()
      $(".ed_hwg_" + id ).show()
      $("#upd_hwg_" + id ).show()
      break
    case "upd":
     $.post (instr, { 
        hwg_name: $('#ed_hwg_' + id + '_name').val(),
        pmp_temp_thresh: $('#ed_hwg_' + id + '_pmp_temp_thresh').val(),
        pmp_moist_thresh: $('#ed_hwg_' + id + '_pmp_moist_thresh').val(),            
        fan_temp_thresh: $('#ed_hwg_' + id + '_fan_temp_thresh').val(),
        fan_moist_thresh: $('#ed_hwg_' + id + '_fan_moist_thresh').val(),
        lgt_start_time: $('#ed_hwg_' + id + '_lgt_start_time').val(),
        lgt_stop_time: $('#ed_hwg_' + id + '_lgt_stop_time').val() 
      }, function(data){
        reloadElements()
      });
      break     
    case "add":
      switch (mod){
        case "hwg":
          $.post (instr, { 
            hwg_name: $('#add_hwg_name').val(),
            pmp_temp_thresh: $('#add_hwg_pmp_temp_thresh').val(),
            pmp_moist_thresh: $('#add_hwg_pmp_moist_thresh').val(),            
            fan_temp_thresh: $('#add_hwg_fan_temp_thresh').val(),
            fan_moist_thresh: $('#add_hwg_fan_moist_thresh').val(),
            lgt_start_time: $('#add_hwg_lgt_start_time').val(),
            lgt_stop_time: $('#add_hwg_lgt_stop_time').val() 
          }, function(data){
            reloadElements()
          });
          break
        case "sth": 
          $.post (instr, { 
            name: $('#add_sth_name').val(),
            addr: $('#add_sth_addr').val(),
          }, function(data){
            reloadElements()
          });
          break
        case "shy":
          $.post (instr, {
            name: $('#add_shy_name').val(),
            chan: $('#add_shy_chan').val()
          }, function(data){
            reloadElements()
          });
          break
        case "pmp":
            $.post (instr, { 
            name: $('#add_pmp_name').val(),
            pin: $('#add_pmp_pin').val() 
          }, function(data){
            reloadElements()
          });
          break
        case "fan":
            $.post (instr, { 
            name: $('#add_fan_name').val(),
            pin: $('#add_fan_pin').val() 
          }, function(data){
            reloadElements()
          });
          break
        case "lgt":
            $.post (instr, { 
            name: $('#add_lgt_name').val(),
            pin: $('#add_lgt_pin').val()
          }, function(data){
            reloadElements()
          });
          break
        case "qry":
          $("#add_resources").load("/add_resources/query",function(data){
            $("body").spin(false)
          });
          break
      }
      break //break from "add" case
    case "add_sth":
    case "ass":
      $.post(instr, {
        group: $('#ass_' + mod + '_' + id + '_group').val()
      }, function(data){
        reloadElements()
      });
      break //break from "ass" case
    case "rem":
    case "del":
      $.post(instr, function(data){
        reloadElements()
      })
      break // break from "rem", "del" cases
  }
});