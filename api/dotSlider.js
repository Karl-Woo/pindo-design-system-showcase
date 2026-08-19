/**
 * pd-dot-slider 后端联动接口（showcase 演示版）
 *
 * Showcase 不接真实 API。此文件用 in-memory 持久化模拟「写入 / 读取」链路，
 * 真实业务请见 seaFreight/api/dotSlider.js（其中调用 utils/network.js）。
 *
 * 数据形状：
 *   index     : 当前选中档位索引（0 ~ options.length-1）
 *   label     : 用户看到的文本，例如 '5-10'
 *   weight_kg : 后端真实想要的数值（例如 10）。这是新增字段，由 component
 *               在 change 事件第三个参数中提供。
 */

let _stored = { index: 1, label: '2-5', weight_kg: 3.3 }

export const setDotSliderValue = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      _stored = {
        index: data.index ?? data.value ?? 0,
        label: data.label || '',
        weight_kg: data.weight_kg
      }
      resolve({
        ok: true,
        weight_range_index: _stored.index,
        weight_range_label: _stored.label,
        weight_kg: _stored.weight_kg
      })
    }, 120)
  })
}

export const getDotSliderValue = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        weight_range_index: _stored.index,
        weight_range_label: _stored.label,
        weight_kg: _stored.weight_kg
      })
    }, 120)
  })
}
